import express, { json } from 'express';
import http from 'http';
import ws from 'ws';

const app = express();
const port = 8080; // default port to listen

const server = http.createServer(app);

const connections: any = {};



const wss = new ws.Server({ server });
wss.on('connection', function connection(w) {
    w.on('message', function incoming(message: string) {
        const parsedMessage = JSON.parse(message);

        if (parsedMessage.type === 'CODE') {
            const code = parsedMessage.payload;
            console.log('sent code: ', code);
            const c = connections[code];
            console.log(c);
            if (c) {
                // second player
                connections[code] = {
                    ...connections[code],
                    player2: w,
                };

                // ready to play
                const { player1, player2 } = connections[code];
                player1.send('{"test": "READY TO PLAY"}');
                player2.send('{"test": "READY TO PLAY"}');
            } else {
                // first player
                console.log('Add player 1');
                connections[code] = { player1: w, player2: null };
            }
        }

        console.log('received: %s', message);
        w.send(message);
    });

    w.send(JSON.stringify({ type: 'CONNECTED' }));
});

app.get('/', (req, res) => {
    res.end('Hello World');
});

app.get('/api/invitation', (req, res) => {
    const result = {
        code: Math.floor(100000 + Math.random() * 900000),
    };
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
});

// start the Express server
server.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
