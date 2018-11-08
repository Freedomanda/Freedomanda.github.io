sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "chuntian/resume/model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function(Controller, formatter, Filter,FilterOperator) {
	"use strict";

	return Controller.extend("chuntian.resume.controller.Project", {

		formatter: formatter,

		onInit: function () {

        },
        onFilterProject: function (oEvent) {
            //Build filter array
            var aFilter = [];
            var sQuery = oEvent.getParameter("query");
            if (sQuery) {
                aFilter.push(new Filter("Name",FilterOperator.Contains,sQuery));
            }
            //filter binding
            var oList = this.byId("Project");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        },
        onPress: function (oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oItem = oEvent.getSource();
            var path = oItem.getBindingContext("project").getPath().split("/");
            var toPage;
            switch (path[2]) {
                case '0': toPage = "D10"; break;
                case '1': toPage = "C50"; break;
                case '2': toPage = "C40"; break;
                default: toPage = 'Detail';
            }
            if (toPage =="Detail") {
                oRouter.navTo(toPage, { projectID: oItem.getBindingContext("project").getProperty("ID")});
            } else {
                oRouter.navTo(toPage);
            };
            
        }
	});
});