
var express=require("express");
var httpProxy=require("http-proxy");
var path = require("path");
var app = express.createServer();

var proxy = new httpProxy.RoutingProxy();

app.use(express.bodyParser());

app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
console.log(path.normalize(__dirname + '/../js'));
app.use("/js", express["static"](path.normalize(__dirname + '/../js')));
app.use(app.router);

app.all('*', function(req, res) {
    console.log("Check");
    proxy.proxyRequest(req, res, {
        host: '172.19.32.127', port: 80
    });
});

app.listen(8000);
console.log("Server listening on port", 8000);
