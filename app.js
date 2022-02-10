const fs = require("fs");
const express = require("express");

const app = express();

app.get('/', (req, res) =>{
    res.status(200).json({message: "Hello from the server...", app: "Tour and Travel"})
});

// app.post('/', (req, res) =>{
//     res.send('Checking the post method...')
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/json-data/data/tours-simple.json`));
// console.log(tours);

app.get('/api/v1/tours', (req, res) =>{
    res.status(200).json({
        status: "Success",
        result: tours.length,
        data: {
            tours: tours
        }
    })
});

const port = 3000;
app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});