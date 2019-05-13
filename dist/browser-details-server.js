"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express = require("express");
var socketIo = require("socket.io");
var browser_data_1 = require("./models/browser-data");
var cors = require('cors');
var bodyParser = require('body-parser');
var BrowserDetailsServer = /** @class */ (function () {
    function BrowserDetailsServer() {
        this.SOCKET_PORT = 8080;
        this.HTTP_PORT = 3000;
        this.browserData = new browser_data_1.BrowserData();
        this.createApp();
        this.listenToSocket();
        this.listedToHttp();
    }
    BrowserDetailsServer.prototype.createApp = function () {
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.server = http_1.createServer(this.app);
    };
    BrowserDetailsServer.prototype.listedToHttp = function () {
        var _this = this;
        this.app.post('/', function (req, res) {
            _this.browserData.updateBrowserData(req.body.browser);
            _this.emitNewBrowserData();
            res.json(_this.browserData.getBrowserData());
        });
        this.app.listen(this.HTTP_PORT, function () { return console.log("Running http server on port " + _this.HTTP_PORT + "!"); });
    };
    BrowserDetailsServer.prototype.listenToSocket = function () {
        var _this = this;
        this.io = socketIo(this.server);
        this.server.listen(this.SOCKET_PORT, function () {
            console.log("Running socket server on port " + _this.SOCKET_PORT);
        });
        this.io.on('connect', function (socket) {
            console.log("Connected client on port " + _this.SOCKET_PORT);
            socket.on('new-browser-data', function (m) {
                console.log('[server](message): %s', JSON.stringify(m));
                _this.browserData.updateBrowserData(m);
                _this.emitNewBrowserData();
            });
            socket.on('disconnect', function () {
                console.log('Client disconnected');
            });
        });
    };
    BrowserDetailsServer.prototype.emitNewBrowserData = function () {
        this.io.emit('browser-data', this.browserData.getBrowserData());
    };
    BrowserDetailsServer.prototype.getApp = function () {
        return this.app;
    };
    return BrowserDetailsServer;
}());
exports.BrowserDetailsServer = BrowserDetailsServer;
