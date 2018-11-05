sap.ui.define([
"sap/ui/core/mvc/Controller",
"sap/ui/demo/basicTemplate/model/formatter"
], function(Controller, formatter) {
"use strict";

    return Controller.extend("chuntian.PracticeHome.Practices.HelloWorld.Helloworld", {

formatter: formatter,

onInit: function () {
    // create a mobile app and display page1 initially
    var app = new sap.m.App("myApp", {
        initialPage: "page1"
    });
    // create the first page
    var page1 = new sap.m.Page("page1", {
        title: "Hello World",
        showNavButton: false,
        content: new sap.m.Button({
            text: "Go to Page 2",
            press: function () {
                // navigate to page2
                app.to("page2");
            }
        })
    });
    // create the second page with a back button
    var page2 = new sap.m.Page("page2", {
        title: "Hello Page 2",
        showNavButton: true,
        navButtonPress: function () {
            // go back to the previous page
            app.back();
        }
    });
    // add both pages to the app
    app.addPage(page1).addPage(page2);
    // place the app into the HTML document
    app.placeAt("content");
}
});
});