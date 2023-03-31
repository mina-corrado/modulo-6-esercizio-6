const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')
require('dotenv').config();
//console.log(process.env)

//routes
const routesBlogPost = require('./routes/routes-blogpost');
const routesAutore = require('./routes/routes-autore');
const routesComment = require('./routes/routes-comment');

//middleware
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const auth = require('./middleware/auth');

const app = express();
app.use(express.json());
app.use(cors());

const unless = (path, middleware) => {
    return (req, res, next) => {
        // console.log("req => ",req)
        if (path === req.path || path.concat('/') === req.path) {
            return next();
        } else {
            return middleware(req, res, next);
        }
    };
};

app.use(logger);
app.use(errorHandler);
app.use(unless('/login', auth));

app.use(routesBlogPost);
app.use(routesAutore);
app.use(routesComment);


const start = async() => {
    try {
        await mongoose.connect('mongodb+srv://minacorrado:SW14D3KwA2WilPUH@cluster0.oopravd.mongodb.net/Epicode')
        app.listen(3000, ()=>{
            console.log("listening on port 3000")
        });    
    } catch (error) {
        console.log("error: ", error);    
    }
}

//avvio
start();