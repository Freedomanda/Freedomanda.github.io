sap.ui.define([ "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/util/File"
   /* "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel" */
    ],
    function (Controller, messageToast, File) {
    "use strict";
        return Controller.extend("chuntian.home.controller.HomePage.Panel5", {
            onDownLoad: function(){
                File.save("chuntian/home/index.html","TEST" ,".csv" );
                window.location.href = "chuntian/home/index.html";
                windows.open();
            }
    });
});