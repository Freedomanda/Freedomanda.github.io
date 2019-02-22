sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    //"chuntian/resume/model/models",
    "sap/ui/model/json/JSONModel",
    "chuntian/resume/controller/Dialog/HelloDialog"
], function (UIComponent, Device, JSONModel, HelloDialog) {
	"use strict";

	return UIComponent.extend("chuntian.resume.Component", {

        metadata: {
                rootView: {
                    "viewName": "chuntian.resume.view.App",
                    "type": "XML",
                    "async": true,
                    "id": "chuntian"
                }
			//manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
            //this.setModel(models.createDeviceModel(), "device");

            // create the views based on the url/hash
            this.getRouter().initialize();

            //set data model
            var oData = {
                recipient: { name: "World" }
            };
            var oModel = new JSONModel(oData);
            this.setModel(oModel);

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
	});
});