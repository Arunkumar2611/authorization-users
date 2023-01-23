import express from 'express';
import router from './routes/main.js';
import connect from './config/database.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use(router);
connect();

app.listen(PORT, () => {
    console.log("Server listen on PORT:", PORT);
})
