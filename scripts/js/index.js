require.config({
    paths: {
        "_tpl": "ext/tpl",
        "underscore": "ext/underscore",
        "backbone": "ext/backbone"
    }
});
require(["pages/router", "require"], function(Router, require) {

    $('head').append('<link rel="stylesheet" href="' + require.toUrl("style.css") + '" type="text/css" />');
    Router.begin();

});
