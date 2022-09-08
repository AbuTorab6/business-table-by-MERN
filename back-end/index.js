
const express = require('express');
const app = express();
const mongoose = require('mongoose');

var productRouter = require('./routers/productRouter')

/*========================================*/
/*============security package=============*/
/*=========================================*/
var cors = require('cors');
var mongoSanitize = require('express-mongo-sanitize');
var helmet = require('helmet');
var hpp = require('hpp');
var xssClean = require('xss-clean');
var  rateLimit = require('express-rate-limit');

/*here we have to increase the size of request body. When Client site send image as base64 format the string of base64 for image is too large. Normaly the request body of server site can not carry large string. Thats why we have to increase the size of request body*/

app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb', extended: true}));





app.use(cors());
app.use(mongoSanitize());
app.use(helmet());
app.use(hpp());
app.use(xssClean());

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, 
	legacyHeaders: false, 
})
app.use(limiter)





/*========================================*/
/*================Routing=================*/
/*========================================*/
app.use('/',productRouter)
app.use('*',(req,res)=>{
    res.status(404);
    res.send("Sorry! Wrong url");
})




/*========================================*/
/*======mongoDB Database connection=======*/
/*========================================*/

var URI = 'mongodb://localhost:27017/BusinessTableDB';
var OPTION = {
    user:'',
    pass:'',
    autoIndex:true
}

mongoose.connect(URI,OPTION,{useNewUrlParser:true,useUnifiedTopology:true}).then
(
    (res)=>
    {
        console.log("connection established")
    }
).catch
(
    (err)=>{
        console.log("connection failed");
        console.log(err);
    }
)


app.listen(5000);