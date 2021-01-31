import express from 'express';
import bodyParser from 'body-parser';
import https from 'https';
import fs from 'fs';

import { initializeAuth } from './auth';
import { connect, init as initDb } from './db';
import router from './routes';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('The code hath compileth!');
});

// Set up authentication and authorization
initializeAuth(app);

// Parse JSON request payloads automatically
app.use(bodyParser.json());

// Set up routes (REST API, auth, etc)
app.use('/', router);

https
  .createServer(
    {
      cert: fs.readFileSync('server.cert'),
      key: fs.readFileSync('server.key'),
    },
    app,
  )
  .listen(port, async () => {
    console.log(`server is listening on ${port}`);
    await initDb();
    await connect();
    console.log('Connected to database!');
  });
