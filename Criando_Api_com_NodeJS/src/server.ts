import express from 'express';
import { createConnection } from './database/data-source';
import { router } from './routes';

import './shared/container';

createConnection('localhost')
const app = express()

app.use(express.json())

app.use(router)

app.listen(3131, () => console.log("Server is running!"))