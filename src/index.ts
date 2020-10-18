import express from 'express';
import { connect } from './event-operations';
import EventRouter from './routes/events';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('The code hath compileth!');
});

app.use('/events', EventRouter);

app.listen(port, async () => {
  console.log(`server is listening on ${port}`);
  await connect();
  console.log('Connected to database!');
});
