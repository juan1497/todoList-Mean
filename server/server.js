const express = require('express');
const cors = require('cors');
const logger=require('morgan');

// local
const {connect}=require('./config/database')
const HTTPSTATUSCODE = require("./utils/httpStatusCode");
const user=require('./app/api/routes/user.routes')
const tarea=require('./app/api/routes/tarea.routes')


connect();

const app = express();


app.set("secretKey","nodeRestApi");

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(cors({
    origin: ['http://localhost:4200'],
    credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger("dev"));
// rutas
app.use("/user",user)
app.use('/tarea',tarea)

// 404 route
app.use((req, res, next) => {
    let err = new Error();
    err.status = 404;
    err.message = HTTPSTATUSCODE[404];
    next(err);
});


app.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || 'Unexpected error');
});

app.disable('x-powered-by');

app.listen(3000, () => {
    console.log("Node server listening on port 3000");
});