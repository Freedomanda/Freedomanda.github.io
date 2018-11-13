sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "chuntian/resume/model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function(Controller, formatter, Filter,FilterOperator) {
	"use strict";

	return Controller.extend("chuntian.resume.controller.Home.ProjList", {

		formatter: formatter,

		onInit: function () {

        },
        onFilterProject: function (oEvent) {
            //Build filter array
            var aFilter = [];
            var sQuery = oEvent.getParameter("query");
            if (sQuery) {
                var mFilter = new Filter(
                    {
                        filters: [new Filter({ path: "Name", operator:FilterOperator.Contains, value1:sQuery }),
                            new Filter({ path:"Date", operator: FilterOperator.Contains, value1:sQuery }),
                            new Filter({ path: "Description", operator: FilterOperator.Contains, value1: sQuery }),
                            new Filter({ path: "Customer", operator: FilterOperator.Contains, value1: sQuery }),
                            new Filter({ path: "Company", operator: FilterOperator.Contains, value1: sQuery })],
                        and: false
                    });
                aFilter.push(mFilter);
                //aFilter.push(new Filter("Name", FilterOperator.Contains, sQuery));
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
            var id = oItem.getBindingContext("project").getProperty("ID");
            var toPage = "Detail";
            oRouter.navTo(toPage, { projectID: path[2] });

            /*oRouter.navTo(toPage, { projectID: path[2] });
            switch (path[2]) {
                case '0': toPage = "D10"; break;
                case '1': toPage = "C50"; break;
                case '2': toPage = "C40"; break;
                case '3': toPage = 'notFound'; break;
                default: toPage = 'Detail';
            }
            if (toPage === "Detail") {
                oRouter.navTo(toPage, { projectID: path[2] });
            } else if (toPage === "notFound") {
                // display the "notFound" target without changing the hash
                /*oRouter.getTargets().display("notFound", {
                    fromTarget: "ResumeHome"
                });*/
                /*oRouter.navTo(toPage);
            } else {
                oRouter.navTo(toPage);
            }*/
            
        },
        onOpenDialog: function () {
            this.getOwnerComponent().openHelloDialog();
        }
	});
});