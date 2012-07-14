require.config({
    paths: {
        "_tpl": "ext/tpl",
        "underscore": "ext/underscore",
        "backbone": "ext/backbone"
    }
});
require(["pages/router"], function(Router) {

    Router.begin();

});
