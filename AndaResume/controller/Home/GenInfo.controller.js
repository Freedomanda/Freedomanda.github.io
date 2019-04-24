sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "chuntian/resume/model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/m/library"
], function (Controller, formatter, Filter, FilterOperator, History, MessageToast, mobileLibrary) {
    "use strict";

    return Controller.extend("chuntian.resume.controller.Home.GenInfo", {

        formatter: formatter,

        onInit: function () {

        },
        formatMail: function (email) {
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            return mobileLibrary.URLHelper.normalizeEmail(
                email,
                oBundle.getText("GenInfo_mailSubject"),
                oBundle.getText("GenInfo_mailBody"));
        },
        onPress: function (oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("helloworld");
        },
        onNavBack: function (oEvent) {
            var oHistory, sPreviousHash;
            oHistory = History.getInstance();
            sPreviousHash = oHistory.getPreviousHash();
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getRouter().navTo("resume", {}, true /*no history*/);
            }
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