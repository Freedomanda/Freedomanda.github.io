sap.ui.define(["sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History"
],
    function (Controller, messageToast, History) {
        "use strict";
        return Controller.extend("chuntian.PracticeHome.controller.Common", {
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
                    this.getRouter().navTo("PracticeHome", {}, true /*no history*/);
                }
            }
        });
    });