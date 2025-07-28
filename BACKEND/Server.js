// import packages
import morgan from 'morgan';
import chalk from 'chalk';
import express from 'express';
import dotenv from 'dotenv';
import dBConnection from './Config/db.js';
import router from './Routes/userRoutes.js';

// use app variable to give the all access of express
const app=express();


// this is dotenv configuration
dotenv.config({path:'.env'});


// Port set and also get from  .env file
const Port=process.env.PORT || 5001;


// Middlewares
app.use(morgan('dev'));
app.use(express.json())
app.use('/mern/api',router);


// Database Connection Logic Here
// Server Listen at Port  http://localhost:5000 base Api

dBConnection().then(()=>
{
    app.listen(Port,()=>
    {
        console.log(chalk.bgBlue(`Server is Running at Port ${Port}`));
    })
})
