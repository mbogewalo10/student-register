const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');



const studentRoutes = require('./api/routes/students');
const userRoutes = require('./api/routes/users')

mongoose.Promise = global.Promise;
const dbUrl = "mongodb://mboge:niamina1@ds239967.mlab.com:39967/heroku_zg0fw16q"
mongoose.connect(  process.env.MONGODB_URL || dbUrl, {useCreateIndex: true, useNewUrlParser:true, useUnifiedTopology:true});
const db = mongoose.connection;

db.once("open", _=> {
    console.log("Connected successfully to mongodb database on " + dbUrl);
})

db.on("error", err =>{
    console.error("Connection Error" + err);
})



app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Accept, Content-Type, X-Requested-With, Authorization, Origin');

    if(req.method === 'OPTIONS'){
        res.header('Access-control-Allow-Methods', 'PUT, PATCH, DELETE, GET, POST');
        return res.status(200).json({});
    }
    next();
});


app.use('/student', studentRoutes);
app.use('/user', userRoutes);

if(process.env.NODE_ENV === "production") {
    //set satic folder
    app.use(express.static('frontend/build'));
    app.get('*', (req,res,next)=> {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;