const fs = require("fs");
const express = require("express");
const morgan  = require('morgan');

// import the routes
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json()); // will be used as a middleware

// MIDDLEWARES

app.use(morgan('dev'));
// custom middleware example
app.use((req, res, next) =>{
    console.log("Hello from the middleware");
    next();
})

// custom middleware to convert the request time to ISO string format
app.use((req, res, next) =>{
    req.requestTime = new Date().toISOString().substring(0, 10);
    next();
})

app.get('/', (req, res) =>{
    res.status(200).json({message: "Hello from the server...", app: "Tour and Travel"})
});





// ROUTES

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', delteTour);

// MOUNTING ROUTES
app.use('/api/v1/tours', tourRouter); // defining a middleware route or mounting the tour router
app.use('/api/v1/users', userRouter); // mounting a user router


module.exports = app;