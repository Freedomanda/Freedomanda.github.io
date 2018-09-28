sap.ui.define([ "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
   /* "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel" */
    ],
    function (Controller, messageToast) {
    "use strict";
        return Controller.extend("chuntian.home.controller.HomePage.Panel3", {
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

            }
    });
});