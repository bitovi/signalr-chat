const path = require('path');
const fs = require('fs');
const http = require('http');
const exec = require('child_process').exec;
const express = require('express');
const nconf = require('nconf');
const compression = require('compression');
const fallback = require('express-history-api-fallback');
const serveStatic = require('serve-static');

// Load environment-specific config from command line, env and config/*.json files
nconf.argv().env();
nconf.file({ file: `./config/${nconf.get('NODE_ENV') || 'default'}.json` });

const ROOT = process.cwd();
// Create app that will serve the application
const app = express();

app
  .use(compression())
  .use('/', serveStatic(nconf.get('staticPath'), {
    index: nconf.get('indexFile')
  }));

// Enable push state routing
app.use(fallback(path.join(ROOT, nconf.get('staticPath'), nconf.get('indexFile'))));

// Enable steal-tools live-reload in development
if(nconf.get('liveReload')) {
  var stealToolsPath = path.join("node_modules", ".bin", "steal-tools");
		if(!fs.existsSync(stealToolsPath)) {
			console.error('live-reload not available: ' +
				'No local steal-tools binary found. ' +
				'Run `npm install steal-tools --save-dev`.');
		} else {
			var cmd = `${stealToolsPath} live-reload`;

			var child = exec(cmd, {
				cwd: process.cwd()
			});

			child.stdout.pipe(process.stdout);
			child.stderr.pipe(process.stderr);

			var killOnExit = require('infanticide');
			killOnExit(child);
		}
}

const port = process.env.PORT || nconf.get('port');
const host = 'http://localhost';

const server = http.createServer(app).listen(port);

server.on('error', (e) => {
	if(e.code === 'EADDRINUSE') {
		console.error(`ERROR: Can not start can-connect-test-signalr-app on port ${port}.\nAnother application is already using it.`);
	} else {
		console.error(e);
		console.error(e.stack);
	}
});

server.on('listening', () =>
  console.log(`can-connect-test-signalr-app application started on ${host}:${port}`)
);
