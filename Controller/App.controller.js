﻿sap.ui.define([ "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
   /* "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel" */ ],
    function (Controller, messageToast, JSONModel,ResourceModel) {
    "use strict";
        return Controller.extend("chuntian.home.controller.App", {
            /*onInit: function () {
             //set data model on view
                var oData = {
                    recipient: { name: "World" }
                };
                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel);
            // set i18n  model on view
                var i18nModel = new ResourceModel({ bundleName: "chuntian.home.i18n.i18n" });
                this.getView().setModel(i18nModel,"i18n");
            },*/
        onShowHello: function () {
            // show a native JavaScript alert static
            //messageToast.show("点我干哈");
            //read msg from i18n
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("helloMsg", [sRecipient]);
            // show message
            messageToast.show(sMsg);
            }
    });
});