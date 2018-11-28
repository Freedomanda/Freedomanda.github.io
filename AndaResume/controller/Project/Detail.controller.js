sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "chuntian/resume/model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (Controller, formatter, Filter, FilterOperator, History, MessageToast, JSONModel) {
    "use strict";
    var _aValidTabKeys = ["Summany", "Contribute", "Skills", "Others"];

    return Controller.extend("chuntian.resume.controller.Project.Detail", {

        formatter: formatter,

        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            this.getView().setModel(new JSONModel(), "view");
            oRouter.getRoute("Detail").attachMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            var oArgs, oView, oQuery;

            oArgs = oEvent.getParameter("arguments");
            oView = this.getView();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

            oView.bindElement({
                path: "project>/Project/" + oArgs.projectID ,
                events: {
                    change: this._onBindingChange.bind(this),
                    dataRequested: function (oEvent) {
                        oView.setBusy(true);
                    },
                    dataReceived: function (oEvent) {
                        oView.setBusy(false);
                    }
                }
            });

            oQuery = oArgs["?query"];
            if (oQuery && _aValidTabKeys.indexOf(oQuery.tab) > -1) {
                oView.getModel("view").setProperty("/selectedTabKey", oQuery.tab);
                // support lazy loading for the Skills and Others
                if (oQuery.tab === "Skills" || oQuery.tab === "Others") {
                    // the target is either "resumeTabSkills" or "resumeTabOthers"
                    oRouter.getTargets().display("resumeTab" + oQuery.tab);
                }
            } else {
                // the default query param should be visible at all time
                oRouter.navTo("Detail", {
                    projectID: oArgs.projectID,
                    query: {
                        tab: _aValidTabKeys[0]
                    }
                }, true /*no history*/);
            }
        },

        _onBindingChange: function (oEvent) {
            // No data for the binding
            if (!this.getView().getBindingContext()) {
                //this.getRouter().getTargets().display("notFound");
            }
        },
        onTabSelect: function (oEvent) {
            var oCtx = this.getView().getBindingContext("project");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Detail", {
                projectID: oCtx.getPath().split("/")[2], //oCtx.getProperty("ID"),
                query: {
                    tab: oEvent.getParameter("selectedKey")
                }
            }, true /*without history*/);
        },
        onPress: function (oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("helloworld");
        },
        onNavBack: function (oEvent) {
            var oHistory, sPreviousHash;
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oHistory = History.getInstance();
            sPreviousHash = oHistory.getPreviousHash();
            //if (sPreviousHash !== undefined) {
            //    window.history.go(-1);
            //} else {
            oRouter.navTo("ResumeHome", {}, true /*no history*/);
            //}
        },
        onShowHello: function () {
            // show a native JavaScript alert static
            //messageToast.show("点我干哈");
            //read msg from i18n
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("helloMsg", [sRecipient, oBundle.getText("Welcome")]);
            // show message
            MessageToast.show(sMsg);
        },
        onOpenDialog: function () {
            /*Replace and refactor to new indepent js - helloDialog.js,
            var oView = this.getView();
            var oDialog = oView.byId("helloDialog");
            // create dialog lazily
            if (!oDialog) {
                // create dialog via fragment factory
                oDialog = sap.ui.xmlfragment(oView.getId(), "chuntian.home.view.HelloDialog", this);
                // another way to load fragment
                 // oDialog = sap.ui.xmlfragment(oView.getId(),
                   // { "fragmentName": "chuntian.home.view.HelloDialog"}, this);  // Same as above
                oView.addDependent(oDialog);
            }
            oDialog.open(); */
            this.getOwnerComponent().openHelloDialog();
        }
            /* Remove and refactor to new indepent js - helloDialog.js,
            onCloseDialog: function () {
                this.getView().byId("helloDialog").close();
            } */
    });
});