sap.ui.define(["sap/ui/core/mvc/Controller",
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
                var oView = this.getView();
                var oDialog = oView.byId("helloDialog");
                // create dialog lazily
                if (!oDialog) {
                    // create dialog via fragment factory
                    oDialog = sap.ui.xmlfragment(oView.getId(), "chuntian.home.view.HelloDialog", this);
                    /* another way to load fragment
                     * oDialog = sap.ui.xmlfragment(oView.getId(),
                        { "fragmentName": "chuntian.home.view.HelloDialog"}, this);  // Same as above
                    */
                    oView.addDependent(oDialog);
                }
                oDialog.open();
            },
            onCloseDialog: function () {
                this.getView().byId("helloDialog").close();
            }

        });
    });