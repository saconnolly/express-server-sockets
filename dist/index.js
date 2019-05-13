"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browser_details_server_1 = require("./browser-details-server");
var app = new browser_details_server_1.BrowserDetailsServer().getApp();
exports.app = app;
