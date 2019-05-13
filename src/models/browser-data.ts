import { Browsers } from './browsers.enum';

class BrowserDataDetails {
    public chrome: number = 0;
    public safari: number = 0;
    public firefox: number = 0;
    public internetExporer: number = 0;
    public edge: number = 0;
    public unsupported: number = 0;
}

export class BrowserData {
    public browserDataDetails: BrowserDataDetails;

    constructor() {
        this.browserDataDetails = new BrowserDataDetails();
    }

    getBrowserData() {
        return this.browserDataDetails;
    }

    updateBrowserData(val) {
        if (val === Browsers.Chrome) {
            this.browserDataDetails.chrome++;
        } else if (val === Browsers.Sarari) {
            this.browserDataDetails.safari++;
        } else if (val === Browsers.Firefox) {
            this.browserDataDetails.firefox++;
        } else if (val === Browsers.InternetExplorer) {
            this.browserDataDetails.internetExporer++;
        } else if (val === Browsers.Edge) { 
            this.browserDataDetails.edge++;
        } else {
            this.browserDataDetails.unsupported++;
        }
    }
}