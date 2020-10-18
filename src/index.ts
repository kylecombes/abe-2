import express from 'express';
import https from 'https';
import fs from 'fs';

import { initializeAuth } from './auth';
import { connect } from './event-operations';
import router from './routes';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('The code hath compileth!');
});

// Set up authentication and authorization
initializeAuth(app);

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
    await connect();
    console.log('Connected to database!');
  });
