sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "chuntian/resume/model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"], function (Controller, formatter, Filter, FilterOperator, History, JSONModel, MessageToast ) {
    "use strict";

    return Controller.extend("chuntian.resume.controller.Home.Career", {

        formatter: formatter,

        onInit: function () {
            var dateFrom = new Date();
            dateFrom.setUTCDate(2);
            dateFrom.setUTCMonth(1);
            dateFrom.setUTCFullYear(2014);

            var dateTo = new Date();
            dateTo.setUTCDate(17);
            dateTo.setUTCMonth(1);
            dateTo.setUTCFullYear(2014);

            var oModel = new JSONModel();
            oModel.setData({
                delimiterDRS1: "-",
                dateValueDRS1: dateFrom,
                secondDateValueDRS1: dateTo,
                dateFormatDRS1: "yyyy/MM/dd",
                dateValueDRS2: new Date(2016, 1, 16),
                secondDateValueDRS2: new Date(2016, 1, 18),
                dateMinDRS2: new Date(2016, 0, 1),
                dateMaxDRS2: new Date(2016, 11, 31)
            });
            this.getView().setModel(oModel);

            this._iEvent = 0;
        },
        onPress: function (oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("helloworld");
        },
        handleChange: function (oEvent) {
            var sFrom = oEvent.getParameter("from");
            var sTo = oEvent.getParameter("to");
            var bValid = oEvent.getParameter("valid");
            var oEventSource = oEvent.getSource();

            this._iEvent++;

            var oText = this.byId("TextEvent");
            oText.setText("Id: " + oEventSource.getId() + "\nFrom: " + sFrom + "\nTo: " + sTo);

            if (bValid) {
                oEventSource.setValueState(sap.ui.core.ValueState.None);
            } else {
                oEventSource.setValueState(sap.ui.core.ValueState.Error);
            }
        },
        onNavBack: function (oEvent) {
            var oHistory, sPreviousHash;
            oHistory = History.getInstance();
            sPreviousHash = oHistory.getPreviousHash();
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getRouter().navTo("resume", {}, true /*no history*/);
            }
        },
        onSelectionChange: function (oEvent) {
            //the selected item could be found via the "item" parameter of "selectionChange" event
            //sap.m.MessageToast.show("oEvent.getParameter('item').getText(): " + oEvent.getParameter("item").getText() + " selected");
            //the selected item could also be found via the "selectItem" association not only when "selectionChange" but when needed
            /*this.byId('CampanyName').setText("SegmentedButton" + "getSelectedItem(): " +
                sap.ui.getCore().byId(this.byId('Company').getSelectedItem()).getText());*/
            this.byId('CampanyName').setText( sap.ui.getCore().byId(this.byId('Company').getSelectedItem()).getText() );
            switch (sap.ui.getCore().byId(this.byId('Company').getSelectedItem()).getText()){
                case "Capgemini":
                    this.byId('Position').setText("SAP ABAP consultant"); break;
                    this.byId('desc').setValue("The description of Capgemini"); break;
                case "Huashi":
                    this.byId('Position').setText("SAP ABAP Team leader"); break;
                    this.byId('desc').setValue("The description of Huashi"); break;
                case "Mingsi":
                    this.byId('Position').setText("SAP ABAP consultant"); break;
                    this.byId('desc').setValue("The description of Mingsi"); break;
                case "Hand":
                    this.byId('Position').setText("ERP development engineer"); break;
                    this.byId('desc').setValue("The description of Hand"); break;
                default:
                    this.byId('Position').setText("");
            }
        },
        onShowHello: function () {
            // show a native JavaScript alert static
            //messageToast.show("点我干哈");
            //read msg from i18n
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("helloMsg", [sRecipient, oBundle.getText("Welcome")]);
            // show message
            MessageToast.show(sMsg);
        },
        onOpenDialog: function () {
            /*Replace and refactor to new indepent js - helloDialog.js,
            var oView = this.getView();
            var oDialog = oView.byId("helloDialog");
            // create dialog lazily
            if (!oDialog) {
                // create dialog via fragment factory
                oDialog = sap.ui.xmlfragment(oView.getId(), "chuntian.home.view.HelloDialog", this);
                // another way to load fragment
                 // oDialog = sap.ui.xmlfragment(oView.getId(),
                   // { "fragmentName": "chuntian.home.view.HelloDialog"}, this);  // Same as above
                oView.addDependent(oDialog);
            }
            oDialog.open(); */
            this.getOwnerComponent().openHelloDialog();
        }
            /* Remove and refactor to new indepent js - helloDialog.js,
            onCloseDialog: function () {
                this.getView().byId("helloDialog").close();
            } */
    });
});