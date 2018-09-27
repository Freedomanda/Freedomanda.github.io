sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    ], function (UIComponent, JSONModel, ResourceModel) {
    "use strict";
    return UIComponent.extend("chuntian.home.Component",
        {
            metadata: {
                rootView: {
                    "viewName": "chuntian.home.view.App",
                    "type": "XML",
                    "async": true,
                    "id": "chuntian"
                }
            },
            init: function () {
                //call the initial function of the parent
                UIComponent.prototype.init.apply(this, arguments);
                //set data model
                var oData = {
                    recipient: { name: "World" }
                };
                var oModel = new JSONModel(oData);
                this.setModel(oModel);
                // set i18n  model on view
                var i18nModel = new ResourceModel({ bundleName: "chuntian.home.i18n.i18n" });
                this.setModel(i18nModel, "i18n");
            }
        }
    )
});