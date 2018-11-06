sap.ui.define([ "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History"
   /* "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel" */
    ],
    function (Controller, messageToast,History) {
    "use strict";
        return Controller.extend("chuntian.home.controller.Homepage.Panel1", {
            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },
            onPress1: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("project_summary");
            }
    });
});