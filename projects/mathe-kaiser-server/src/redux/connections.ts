import ws from "ws";

export class Connections {
    connections: {
        [connectionKey: string]: ws
    } = {};
}