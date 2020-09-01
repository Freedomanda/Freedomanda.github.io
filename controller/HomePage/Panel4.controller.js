sap.ui.define([ "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/util/File"
   /* "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel" */
    ],
    function (Controller, messageToast, File) {
    "use strict";
        return Controller.extend("chuntian.home.controller.HomePage.Panel4", {
            onDownLoad: function(){
                File.save("chuntian/home/CV_En_WuChangchun_2019.doc","CV_Anda_2019_EN" ,".doc" );
            }
    });
});