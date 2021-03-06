const websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;

const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer {
    constructor(blockchain){
        this.blockchain=blockchain;
        this.sockets=[];

    }

    listen () {
        const server = new websocket.Server({port: P2P_PORT});
        server.on('connection', socket => this.connectSocket(socket));
        this.connectToPeers();
        console.log(`Listering for peer-to-peer connection of ${P2P_PORT}`);
    }

    connectSocket(socket){
        this.sockets.push(socket);
        console.log('Socket connected');

        this.messageHandler(socket);

        socket.send(JSON.stringify(this.blockchain.chain));
        this.sendChain(socket);
    }

    connectToPeers() {
        peers.forEach(peer => {

            const socket = new websocket(peer);
            socket.on('open', () => this.connectSocket(socket));
        });
    }

    messageHandler(socket){
        socket.on('message', message => {
            const data = JSON.parse(message);
            console.log('data', data);

            this.blockchain.replaceChain(data);
        });
    }

    sendChain(socket){
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    syncChains() {
        this.sockets.forEach(socket => this.sendChain(socket));
    }
}

module.exports = P2pServer;
