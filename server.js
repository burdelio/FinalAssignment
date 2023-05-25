import express from 'express';
import cors from 'cors';

import router from './src/routes/index.js';
import { db } from './src/models/index.js';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use('/api', router);

db.sync({ force: true })
    .then(() => { console.log('Drop and sync DB'); })
    .catch((err) => {
        console.log(`Failed to sync DB : ${err}`);
    });

app.listen(port, (err) => {
    console.log(err ? `ERROR : ${err}` : `server listening on port ${port}`);
});