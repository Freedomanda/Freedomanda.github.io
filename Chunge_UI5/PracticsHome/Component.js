sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/ui/demo/basicTemplate/model/models"
], function (UIComponent, Device, models, JSONModel) {
	"use strict";

	return UIComponent.extend("sap.ui.demo.basicTemplate.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

            var oModel = new JSONModel();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});