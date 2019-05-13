
import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';
import { BrowserData } from './models/browser-data';
const cors = require('cors');
const bodyParser = require('body-parser');

export class BrowserDetailsServer {
    public readonly SOCKET_PORT:number = 8080;
    public readonly HTTP_PORT:number = 3000;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;
    private browserData: any;

    constructor() {
        this.browserData = new BrowserData();
        this.createApp();
        this.listenToSocket();
        this.listedToHttp();
    }

    private createApp(): void {
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.server = createServer(this.app);
    }

    private listedToHttp(): void {
        this.app.post('/', (req, res) => {
            this.browserData.updateBrowserData(req.body.browser);
            this.emitNewBrowserData();
            res.json(this.browserData.getBrowserData());
        });
        this.app.listen(this.HTTP_PORT, () => console.log(`Running http server on port ${this.HTTP_PORT}!`));
    }

    private listenToSocket(): void {
        this.io = socketIo(this.server);
        this.server.listen(this.SOCKET_PORT, () => {
            console.log(`Running socket server on port ${this.SOCKET_PORT}`,);
        });

        this.io.on('connect', (socket: any) => {
            console.log(`Connected client on port ${this.SOCKET_PORT}`);

            socket.on('new-browser-data', (m: any) => {
                console.log('[server](message): %s', JSON.stringify(m));
                this.browserData.updateBrowserData(m);
                this.emitNewBrowserData();
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    private emitNewBrowserData() {
        this.io.emit('browser-data', this.browserData.getBrowserData());
    }

    public getApp(): express.Application {
        return this.app;
    }
}