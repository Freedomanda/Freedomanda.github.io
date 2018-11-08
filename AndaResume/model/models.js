sap.ui.define([
	"sap/ui/model/json/JSONModel"
], function(JSONModel) {
	"use strict";
	return {
		createDeviceModel: function() {
            var oData = {
                recipient: { name: "World" }
            };
            var oModel = new JSONModel(oData);
            return oModel;
		}

	};
});