sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"chuntian/resume/model/formatter"
], function(Controller, formatter) {
	"use strict";

	return Controller.extend("chuntian.resume.controller.App", {

		formatter: formatter,

		onInit: function () {
           
		}
	});
});