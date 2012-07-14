define(["backbone", "underscore", "jquery", "ext/AcceptsOneView",
        "pages/ViewProgramView"], function(Backbone, _, $, AcceptsOneView, ViewProgram) {

    $(document.body).append("<div id='main'></div>");
    var mainRegion = new AcceptsOneView($("#main"));

    var MainRouter = Backbone.Router.extend({
        routes: {
            "": "index",
            "viewProgram": "viewProgram"
        },

        index: function() {
        
        },

        viewProgram: function() {
            ViewProgram.present(mainRegion);
        },

        begin: function() {
            Backbone.history.start();
        }
    });

    return new MainRouter();

});
