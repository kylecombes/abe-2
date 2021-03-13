import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { initializeAuth } from './auth';
import { connect, init as initDb } from './db';
import router from './routes';

const app = express();
const port = 1234;
app.get('/', (req, res) => {
  res.send('The code hath compileth!');
});

// Set up authentication and authorization
initializeAuth(app);

// TODO: Configure this to be more secure
app.use(cors());

// Parse JSON request payloads automatically
app.use(bodyParser.json());

// Set up routes (REST API, auth, etc)
app.use('/', router);

app.listen(port, async () => {
  console.log(`server is listening on ${port}`);
  await initDb();
  await connect();
  console.log('Connected to database!');
});
