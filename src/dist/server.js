"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = express_1["default"]();
app.get('/*', function (req, res) {
    res.json({
        "message": 'ok'
    });
});
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () { return console.log('Server started at port ' + PORT); });
