import ws from "ws";

export const connections: {
        [connectionKey: string]: ws
    } = {};
