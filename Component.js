sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "chuntian/home/controller/Dialog/HelloDialog"
    //"sap/ui/model/resource/ResourceModel",
], function (UIComponent, JSONModel, HelloDialog) {
    "use strict";
    return UIComponent.extend("chuntian.home.Component",
        {
            metadata: {
                /*Replace by manifest
                rootView: {
                    "viewName": "chuntian.home.view.App",
                    "type": "XML",
                    "async": true,
                    "id": "chuntian"
                }*/
                
                manifest: "json"
            },
            init: function () {
                //call the initial function of the parent
                UIComponent.prototype.init.apply(this, arguments);
                // create the views based on the url/hash,initialize the router
                //this.getRouter.initialize();
                //set data model
                var oData = {
                    recipient: { name: "World" }
                };
                var oModel = new JSONModel(oData);
                this.setModel(oModel);
            /*Removed since it's defined in the manifest.json
                // set i18n  model on view
                var i18nModel = new ResourceModel({ bundleName: "chuntian.home.i18n.i18n" });
                this.setModel(i18nModel, "i18n");
           */
                // set dialog
                this._helloDialog = new HelloDialog(this.getRootControl());

            },
            exit: function () {
                this._helloDialog.destroy();
                delete this._helloDialog;
            },
            openHelloDialog: function () {
                this._helloDialog.open();
            }
        }
    )
});