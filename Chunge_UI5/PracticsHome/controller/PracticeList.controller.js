sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "chuntian/PracticeHome/model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function(Controller, formatter,Filter,FilterOperator) {
	"use strict";

	return Controller.extend("chuntian.PracticeHome.controller.PracticeList", {

		formatter: formatter,

		onInit: function () {

        },
        onFilterPractice: function (oEvent) {
            //Build filter array
            var aFilter = [];
            var sQuery = oEvent.getParameter("query");
            if (sQuery) {
                aFilter.push(new Filter("Name",FilterOperator.Contains,sQuery));
            }
            //filter binding
            var oList = this.byId("PracticeList");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        },
        onPress: function (oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oItem = oEvent.getSource();
            var path = oItem.getBindingContext("practice").getPath().split("/");
            var toPage;
            switch(path[2]){
               case '0': toPage = "helloworld"; break;
                case '1': toPage = "DataBinding"; break;
                case '2': toPage = "FilterToolbar"; break;
                case '3': toPage = "helloworld"; break;
                default: toPage = '';
            }
            if (path) {
                oRouter.navTo(toPage);
            } else {
                oRouter.navTo("NotFound");
            };
            
        }
	});
});