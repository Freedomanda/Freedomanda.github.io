sap.ui.define([], function () {
	"use strict";
	return {
        statusText: function (sStatus) {
            var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
            switch (sStatus) {
                case "A":
                    return resourceBundle.getText("practiceStatusA");
                case "B":
                    return resourceBundle.getText("practiceStatusB");
                case "C":
                    return resourceBundle.getText("practiceStatusC");
                default:
                    return sStatus;
            }
        }
	};
});