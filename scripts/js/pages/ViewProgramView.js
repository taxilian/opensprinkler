define(["backbone", "underscore", "ext/tpl!./jst/ViewProgram.jst", "models/Program"], function(Backbone, _, viewTpl, Program) {

    var ViewProgramView = Backbone.View.extend({
        present: function(region) {
            var self = this;
            if (self.programList) {
                self.programList.fetch().done(function() {
                    self.refresh(); // refresh the view
                });
            } else {
                var programsDfd = Program.collection.fetchAll();
                self.programList = null;
                programsDfd.done(function(programs) {
                    self.programList = programs;
                    self.refresh();
                });
            }
            region.setView(self);
        },

        deactivate: function() {},
        render: function() {
            $(this.el).html(viewTpl({_:_, programs: this.programList}));
            return this;
        },
        refresh: function() {
            return this.render();
        }
    });

    return new ViewProgramView();

});
