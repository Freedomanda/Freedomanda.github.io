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
            var oView = this.getView();
            oView.bindElement({
                path: "project>/Job/3",
                events: {
                    change: this._onBindingChange.bind(this),
                    dataRequested: function (oEvent) {
                        oView.setBusy(true);
                    },
                    dataReceived: function (oEvent) {
                        oView.setBusy(false);
                    }
                }
            });

            var dateFrom = new Date();
            dateFrom.setUTCDate(5);
            dateFrom.setUTCMonth(3);
            dateFrom.setUTCFullYear(2018);

            var dateTo = new Date();

            var oModel = new JSONModel();
            oModel.setData({
                delimiter: "  to   ",
                dateValue: dateFrom,
                secondDateValue: dateTo,
                dateFormat: "yyyy/MM/dd",
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
        onSelectionChange: function (oEvent){
            //the selected item could be found via the "item" parameter of "selectionChange" event
            //sap.m.MessageToast.show("oEvent.getParameter('item').getText(): " + oEvent.getParameter("item").getText() + " selected");
            //the selected item could also be found via the "selectItem" association not only when "selectionChange" but when needed
            /*this.byId('CampanyName').setText("SegmentedButton" + "getSelectedItem(): " +
                sap.ui.getCore().byId(this.byId('Company').getSelectedItem()).getText());*/
            //this.byId('CampanyName').setText(sap.ui.getCore().byId(this.byId('Company').getSelectedItem()).getText());
            var selectValue = sap.ui.getCore().byId(this.byId('Company').getSelectedItem()).getText();
            var jobIndex = selectValue - 1.
            var oView = this.getView();
            oView.bindElement({
                path: "project>/Job/" + jobIndex,
                events: {
                    change: this._onBindingChange.bind(this),
                    dataRequested: function (oEvent) {
                        oView.setBusy(true);
                    },
                    dataReceived: function (oEvent) {
                        oView.setBusy(false);
                    }
                }
            });
            var dateValue = oEvent.getSource().getBindingContext("project").getProperty("dateValue");
            var secondDateValue = oEvent.getSource().getBindingContext("project").getProperty("secondDateValue");
            var dateDelimiter = oEvent.getSource().getBindingContext("project").getProperty("delimiter");
            var dateFormat = oEvent.getSource().getBindingContext("project").getProperty("dateFormat");
            var dateFrom = new Date(dateValue);
            if (secondDateValue === "9999/12/31") {
                var dateTo = new Date( );
            } else {
                var dateTo = new Date(secondDateValue);
            };

            var oModel = new JSONModel();
            oModel.setData({
                delimiter: dateDelimiter,
                dateValue: dateFrom,
                secondDateValue: dateTo,
                dateFormat: dateFormat,
            });
            this.getView().setModel(oModel);

            /*switch(selectValue){
                case "4":
                	this.byId("CampanyName").setText("Capgemini China"); 
                    this.byId("Position").setText("SAP ABAP consultant"); 
                    this.byId("desc").setValue("The description of Capgemini"); break;
                case "3":
                	this.byId("CampanyName").setText("Huashi");
                    this.byId("Position").setText("SAP ABAP Team leader");
                    this.byId("desc").setValue("The description of Huashi"); break;
                case "2":
                	this.byId("CampanyName").setText("Mingsi");
                    this.byId("Position").setText("SAP ABAP consultant"); 
                    this.byId("desc").setValue("The description of Mingsi"); break;
                case "1":
                	this.byId("CampanyName").setText("Hand");
                    this.byId("Position").setText("ERP development engineer");
                    this.byId("desc").setValue("The description of Hand"); break;
                default:
                    this.byId("Position").setText("");
            }*/
        },
        _onBindingChange: function (oEvent) {
            // No data for the binding
            if (!this.getView().getBindingContext()) {
                //this.getRouter().getTargets().display("notFound");
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