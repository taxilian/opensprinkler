define([], function(){
//   Interface for AcceptsOneView:
//    var AcceptsOneView = function() {
//        this.setView = function(v) {
//            ...
//        }
//    }

    function AcceptsOneView(el) {
        var element = el;
        var currentView = null;

        this.setView = function(view) {
            if(currentView!==null) {
                if(currentView==view) {
                    // The new view is the current view, so we'll just refresh and exit.
                    currentView.refresh();
                    return;
                } else {
                    currentView.deactivate();
                }
            }
            if(view===null) {
                el.empty();
                el.hide();
                currentView=null;
                return;
            }
            currentView = view;
            var newContent=currentView.render().el;
//            el.empty();
            var oldChildren = el.children();
            el.append(newContent);
            oldChildren.detach();
            currentView.delegateEvents();
            el.show();
        };
    }
    return AcceptsOneView;
});


