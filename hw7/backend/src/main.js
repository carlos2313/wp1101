import express from 'express';  
import cors from 'cors';
import addRoute from './routes/api/add';
import clearRoute from './routes/api/clear';
import queryRoute from './routes/api/query';
const app = express();
// init middleware
app.use(cors());

// define routes
app.use('/api', addRoute);
app.use('/api', clearRoute);
app.use('/api', queryRoute);

const port = process.env.PORT || 5000;

app.listen(port, () =>
    console.log(`ScoreCard db server listening on port ${port}!`),
);

import connect from './mongo';
connect();