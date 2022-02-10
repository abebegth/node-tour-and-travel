const express = require("express");

const app = express();

app.get('/', (req, res) =>{
    res.status(200).json({message: "Hello from the server...", app: "Tour and Travel"})
});

app.post('/', (req, res) =>{
    res.send('Checking the post method...')
})

const port = 3000;
app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});