const jsonServer = require('json-server');

const json = require('./db.js');

const server = jsonServer.create();
const router = jsonServer.router(json);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use(router);
server.listen(8000, () => {
  console.log('JSON Server is running');
});
