const express = require('express');
const app = express();
const path = require('path'); //Nos ayuda con los diretorios
const cookieParser = require('cookie-parser'); //Middleware que nos ayuda con los cookies
const logger = require('morgan');  //Middleware para observar las consultas que resive el servidor.
//const {} = require('./models/index')


//Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));  //It will not accept data like images, just plain data.
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    next();
});


/**
 * ERROR HANDLER
 */
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
        .json({ error: err.message });
});

module.exports = app;