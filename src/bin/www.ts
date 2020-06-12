#!/usr/bin/env node

/**
 * Module dependencies.
 */

// var app = require('../index');
// var debug = require('debug')('node-api-example:server');
// var http = require('http');

import app from '../index';
import http from 'http';
import debug from 'debug';
import Logger from '../config/winston.config';
import LogLevel from '../enums/log-level.enum';
import dotenv from 'dotenv';

/* tslint:disable-next-line */
const pckg = require('../../package.json');

dotenv.config();

/**
 * Get port from environment and store in Express.
 */
if (!process.env.ENVIRONMENT || !process.env.SERVER_PORT) {
  Logger.warn('Update your .env file');
}
const serverPort = normalizePort(process.env.SERVER_PORT || '3000');
app.set('port', serverPort);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(serverPort);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof serverPort === 'string'
    ? 'Pipe ' + serverPort
    : 'Port ' + serverPort;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      Logger.log({
        level: LogLevel.ERROR,
        message: bind + ' requires elevated privileges'
      });
      process.exit(1);
      break;
    case 'EADDRINUSE':
      Logger.log({
        level: LogLevel.ERROR,
        message: bind + ' is already in use'
      });
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {

  Logger.info({
    label: 'label',
    message: `${pckg.name} [${pckg.version}] listening on port ${serverPort}`
  });
}
