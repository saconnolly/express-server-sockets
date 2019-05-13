"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browsers_enum_1 = require("./browsers.enum");
var BrowserDataDetails = /** @class */ (function () {
    function BrowserDataDetails() {
        this.chrome = 0;
        this.safari = 0;
        this.firefox = 0;
        this.internetExporer = 0;
        this.edge = 0;
        this.unsupported = 0;
    }
    return BrowserDataDetails;
}());
var BrowserData = /** @class */ (function () {
    function BrowserData() {
        this.browserDataDetails = new BrowserDataDetails();
    }
    BrowserData.prototype.getBrowserData = function () {
        return this.browserDataDetails;
    };
    BrowserData.prototype.updateBrowserData = function (val) {
        if (val === browsers_enum_1.Browsers.Chrome) {
            this.browserDataDetails.chrome++;
        }
        else if (val === browsers_enum_1.Browsers.Sarari) {
            this.browserDataDetails.safari++;
        }
        else if (val === browsers_enum_1.Browsers.Firefox) {
            this.browserDataDetails.firefox++;
        }
        else if (val === browsers_enum_1.Browsers.InternetExplorer) {
            this.browserDataDetails.internetExporer++;
        }
        else if (val === browsers_enum_1.Browsers.Edge) {
            this.browserDataDetails.edge++;
        }
        else {
            this.browserDataDetails.unsupported++;
        }
    };
    return BrowserData;
}());
exports.BrowserData = BrowserData;
