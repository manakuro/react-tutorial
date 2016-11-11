'use strict';

const Hapi = require('hapi');
const inert = require('inert');
const vision = require('vision');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});

// Register plug-ins
server.register([vision, inert], (err) => {
    if (err) {
        throw err;
    }
});

// Add the route
server.route({
    method: 'GET',
    path: '/{path*}',
    config: {
        description: 'Static content',
        tags: ['starter']
    },
    handler: {
        directory: {
            path: 'assets',
            listing: true,
            index: false
        }
    }
});

server.route({
    method: 'GET',
    path: '/hello',
    handler: (request, reply) => {
        return reply('hello world');
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});