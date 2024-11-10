import cors from 'cors';
import express from 'express';

import { router } from './router/router.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/',router);

app.listen(3000, console.log("Backend do SumTube rodando em http://localhost:3000"));