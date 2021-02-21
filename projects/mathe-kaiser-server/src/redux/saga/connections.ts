import ws from 'ws';

export const connections: {
    [joinCode: string]: ws;
} = {};
