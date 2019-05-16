sap.ui.define(["sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History"
    //"chuntian/home/controller/BaseController"
    /* "sap/ui/model/json/JSONModel",
     "sap/ui/model/resource/ResourceModel" */
],
    function (Controller, messageToast, History) {
        "use strict";
        return Controller.extend("chuntian.home.controller.App", {
            onInit: function () {
             //set data model on view
                /*var oData = {
                    recipient: { name: "World" }
                };
                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel);
            // set i18n  model on view
                var i18nModel = new ResourceModel({ bundleName: "chuntian.home.i18n.i18n" });
                this.getView().setModel(i18nModel,"i18n");*/
                setTimeout("scrollText()",10000);
            },
            scrollText: function(){
                $("#slogan").slideToggle();
            },
            onShowHello: function () {
                // show a native JavaScript alert static
                //messageToast.show("点我干哈");
                //read msg from i18n
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                var sMsg = oBundle.getText("helloMsg", [sRecipient]);
                // show message
                messageToast.show(sMsg);
            },
            OnNav2Arial: function (oEvent) {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("page1");
            },

            onOpenDialog: function () {
                this.getOwnerComponent().openHelloDialog();
            },

            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },
            onNavBack: function (oEvent) {
                var oHistory, sPreviousHash;
                oHistory = History.getInstance();
                sPreviousHash = oHistory.getPreviousHash();
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    this.getRouter().navTo("homepage", {}, true /*no history*/);
                }
            }
        });
    });