const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json()); // will be used as a middleware

app.get('/', (req, res) =>{
    res.status(200).json({message: "Hello from the server...", app: "Tour and Travel"})
});

// app.post('/', (req, res) =>{
//     res.send('Checking the post method...')
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/json-data/data/tours-simple.json`));
// console.log(tours);

// handling get request to the 'api/v1/tours' url
app.get('/api/v1/tours', (req, res) =>{
    res.status(200).json({
        status: "Success",
        result: tours.length,
        data: {
            tours: tours
        }
    })
});

// handling post request to the 'api/v1/tours' url
app.post('/api/v1/tours', (req, res) =>{
    // console.log(req.body);

    // take the id of the last object from the tours data object, then add 1 to it to specify the id of the object which will be posted.
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body); //allows us to create a new object by mergin to existing object

    // push the new tour to the tours array
    tours.push(newTour);

    // write / persist the new tours object to the file...
    fs.writeFile(`${__dirname}/json-data/data/tours-simple.json`, JSON.stringify(tours), err =>{
        res.status(201).json({
            status: "Success",
            tour: newTour
        })
    })
    // res.send("Done");
})

const port = 3000;
app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});