sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "chuntian/resume/model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel"
], function (Controller, formatter, Filter, ResourceModel, FilterOperator, JSONModel) {
	"use strict";

	return Controller.extend("chuntian.resume.controller.resume", {

		formatter: formatter,
        onInit: function () {
            var lang_flag;
            var lang = navigator.language || navigator.userLanguage;
            var oModel;
            lang = sap.ui.getCore().getConfiguration().getLanguage();
            lang = lang.substr(0, 2); //Got first 2 characters
            if (lang == 'zh') {
                this.byId("Langu").setState(false);
                oModel = new JSONModel("./Project_zh_CN.json");
            } else {
                this.byId("Langu").setState(true);
                oModel = new JSONModel("./Project.json");
            }
            //sap.ui.getCore().setModel(oModel, "project");
            this.getView().setModel(oModel, "project");
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
        onChangeLangu: function (oEvent) {
            var langu;
            var oModel;
            if (oEvent.getParameters("state").state == true) {
                langu = "en_US";
                oModel = new JSONModel("./Project.json");
            } else {
                langu = "zh_CN";
                oModel = new JSONModel("./Project.json");
            }
            
            //this.getView().setModel(oModel, "project");
            /*sap.ui.getCore().byId("__xmlview3--Project").bindItems({
                path: 'project>/Project', template: oTemplate
            });*/
            var sCurrentLocale = sap.ui.getCore().getConfiguration().setLanguage(langu);
            //window.location.reload();//Refresh the    
            //sap.ui.getCore().byId("__xmlview3").byId("Project").rerender();
            //sap.ui.getCore().byId("__xmlview3").setModel(oModel, "project");
        },
        onPress: function (oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oItem = oEvent.getSource();
            var path = oItem.getBindingContext("project").getPath().split("/");
            var id = oItem.getBindingContext("project").getProperty("ID");
            var toPage;
            switch (path[2]) {
                case '0': toPage = "D10"; break;
                case '1': toPage = "C50"; break;
                case '2': toPage = "C40"; break;
                case '3': toPage = 'notFound'; break;
                default: toPage = 'Detail';
            }
            if (toPage === "Detail") {
                oRouter.navTo(toPage, { projectID: oItem.getBindingContext("project").getProperty("ID") });
            } else if (toPage === "notFound") {
                // display the "notFound" target without changing the hash
                /*oRouter.getTargets().display("notFound", {
                    fromTarget: "ResumeHome"
                });*/
                oRouter.navTo(toPage);
            } else {
                oRouter.navTo(toPage);
            }
            
        },
        onOpenDialog: function () {
            this.getOwnerComponent().openHelloDialog();
        }
	});
});