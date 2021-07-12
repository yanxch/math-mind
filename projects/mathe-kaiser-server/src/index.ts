import express from 'express';
import http from 'http';
import path from 'path';
import { AnyAction } from 'redux';
import ws from 'ws';
import { store } from './redux';

const app = express();
const port = process.env.PORT || 8080; // default port to listen

const server = http.createServer(app);

const wss = new ws.Server({ server });
wss.on('connection', function connection(connection) {
    connection.on('message', function incoming(message: string) {
        const action: AnyAction = JSON.parse(message);
        console.log('Got Action: ', action);

        store.dispatch(addConnection(action, connection));
    });
});

function addConnection(action: AnyAction, connection: ws) {
    return {
        ...action,
        payload: {
            ...action.payload,
            connection
        }
    };
}

app.use('/', express.static(path.resolve(__dirname + '../../../mathe-kaiser')));

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname + '../../../mathe-kaiser/index.html'));
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
