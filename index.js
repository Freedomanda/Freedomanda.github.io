sap.ui.define([
	"sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
	"use strict";

	new ComponentContainer({
		name: "chuntian.home",
		settings : {
			id : "chunge"
		},
		async: true
	}).placeAt("content");
});