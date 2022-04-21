const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json()); // will be used as a middleware

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

// app.post('/', (req, res) =>{
//     res.send('Checking the post method...')
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/json-data/data/tours-simple.json`));
// console.log(tours);

// functions for handling route requests
// handling get request for all tours
const getAllTours = (req, res) =>{    // route handler....
    console.log(req.requestTime)
    res.status(200).json({
        status: "Success",
        requestedAt: req.requestTime,
        result: tours.length,
        data: {
            tours: tours
        }
    })
}
// handling get request with url parameter
const getTour = (req, res) =>{
    console.log(req.params); // assigns the value from the url to the 'id' variable
    // we can add ? to the url parameter to make it optional .... api/v1/tours/:id/y?
    // here, y is optional parameter. we can specify or not
    
    const id = req.params.id * 1; // req.params.id is in string format, it has to be a number, that's why we multiply by 1

    // find an element in the tours array whose id is equal to the provided parameter id, then hold only that value in the tour array.
    const tour = tours.find(el => el.id === id); 
    if(!tour){
        res.status(404).json({
            status: "Fail",
            message: "Invalid ID"
        })
    }
    res.status(200).json({
        status: "Success",
        data: {
            tour: tour
        }
    })
}
// handling post request
const createTour = (req, res) =>{
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
}
// handling Patch requests to the 'api/v1/tours/id' url
const updateTour = (req, res) =>{
    if(req.params.id * 1 > tours.length){
        res.status(404).json({
            status: "Fail",
            message: "Invalid ID"
        })
    }

    res.status(200).json({
        status: "Success",
        data: {
            tour: '<Updated tour here>'
        }
    })
}
// handling Delete requests to the 'api/v1/tours/id' url
const delteTour = (req, res) =>{
    if(req.params.id * 1 > tours.length){
        res.status(404).json({
            status: "Fail",
            message: "Invalid ID"
        })
    }

    res.status(204).json({
        status: "Success",
        data: null
    })
}

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', delteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(delteTour);


// Creating a server & listening at 3000
const port = 3000;
app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
    console.log(`You can browse at 127.0.0.1:${port}`)
});