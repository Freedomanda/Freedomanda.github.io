sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "chuntian/PracticeHome/model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/routing/History"
], function (Controller, formatter, Filter, FilterOperator, History) {
    "use strict";

    return Controller.extend("chuntian.PracticeHome.controller.Practice.HelloWorld", {

        formatter: formatter,

        onInit: function () {

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
                this.getRouter().navTo("PracticeHome", {}, true /*no history*/);
            }
        }
    });
});