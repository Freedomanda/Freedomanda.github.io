/* global QUnit */

sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/fl/FakeLrepConnectorLocalStorage",
	"sap/ui/fl/FakeLrepLocalStorage",
], function(
	Opa5,
	FakeLrepConnectorLocalStorage,
	FakeLrepLocalStorage
) {
	"use strict";

	function getFrameUrl(sHash, sUrlParameters) {
		var sUrl = jQuery.sap.getResourcePath("sap/ui/demoapps/rta/freestyle/app", ".html");
		sHash = sHash || "";
		sUrlParameters = sUrlParameters ? "?" + sUrlParameters : "";

		if (sHash) {
			sHash = "#masterDetail-display&/" + (sHash.indexOf("/") === 0 ? sHash.substring(1) : sHash);
		} else {
			sHash = "#masterDetail-display";
		}

		var aHashParts = sHash.split("&");
		aHashParts[1] = aHashParts[1] ? '&' + aHashParts[1] : "";

		return sUrl + aHashParts[0] + sUrlParameters + aHashParts[1];
	}

	return Opa5.extend("sap.ui.demoapps.rta.freestyle.test.integration.pages.Common", {

		iStartTheApp: function(oOptions) {
			oOptions = oOptions || {};
			this.iStartMyAppInAFrame(getFrameUrl(oOptions.hash, oOptions.urlParameters));
		},

		iEnableTheLocalLRep: function() {
			FakeLrepConnectorLocalStorage.enableFakeConnector();
			FakeLrepLocalStorage.deleteChanges();
		},

		iClearTheLocalStorageFromRtaRestart: function() {
			window.localStorage.removeItem("sap.ui.rta.restart.CUSTOMER");
			window.localStorage.removeItem("sap.ui.rta.restart.USER");
		},

		iStartTheAppWithDelay: function(sHash, iDelay) {
			this.iStartMyAppInAFrame(getFrameUrl(sHash, "serverDelay=" + iDelay));
		},

		iLookAtTheScreen: function() {
			return this;
		},

		iStartMyAppOnADesktopToTestErrorHandler: function(sParam) {
			this.iStartMyAppInAFrame(getFrameUrl("", sParam));
		},

		createAWaitForAnEntitySet: function(oOptions) {
			return {
				success: function() {
					var bMockServerAvailable = false,
						aEntitySet;

					this.getMockServer().then(function(oMockServer) {
						aEntitySet = oMockServer.getEntitySetData(oOptions.entitySet);
						bMockServerAvailable = true;
					});

					return this.waitFor({
						check: function() {
							return bMockServerAvailable;
						},
						success: function() {
							oOptions.success.call(this, aEntitySet);
						}
					});
				}
			};
		},

		getMockServer: function() {
			return new Promise(function(success) {
				Opa5.getWindow().sap.ui.require(["sap/ui/demoapps/rta/freestyle/localService/mockserver"], function(mockserver) {
					success(mockserver.getMockServer());
				});
			});
		},

		theUnitNumbersShouldHaveTwoDecimals: function(sControlType, sViewName, sSuccessMsg, sErrMsg) {
			var rTwoDecimalPlaces = /^-?\d+\.\d{2}$/;

			return this.waitFor({
				controlType: sControlType,
				viewName: sViewName,
				success: function(aNumberControls) {
					QUnit.ok(aNumberControls.every(function(oNumberControl) {
							return rTwoDecimalPlaces.test(oNumberControl.getNumber());
						}),
						sSuccessMsg);
				},
				errorMessage: sErrMsg
			});
		}

	});

});
