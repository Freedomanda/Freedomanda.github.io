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
        },
        levelText: function (sLevel) {
            var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
            switch (sStatus) {
                case "Junior":
                    return resourceBundle.getText("Junior");
                case "Middle":
                    return resourceBundle.getText("Middle");
                case "Senior":
                    return resourceBundle.getText("Senior");
                default:
                    return sLevel;
            }
        }
    }    
}); 