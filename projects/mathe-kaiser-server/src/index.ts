import express, { json } from 'express';
import http from 'http';
import ws from 'ws';
import { onMessageCode } from './handlers/code-message-handler';
import { Message, State } from './models';

const app = express();
const port = 8080; // default port to listen

const server = http.createServer(app);

const state: State = {
    connections: {},
};

const wss = new ws.Server({ server });
wss.on('connection', function connection(connection) {
    connection.on('message', function incoming(message: string) {
        const parsedMessage: Message<any> = JSON.parse(message);

        if (parsedMessage.type === 'CODE') {
            const result = onMessageCode(state, parsedMessage, connection);
        }

        console.log('received: %s', message);
        connection.send(message);
    });

    connection.send(JSON.stringify({ type: 'CONNECTED' }));
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
