
// import the app
const app = require('./app');

// START THE SERVER & listening at 3000
const port = 3000;
app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
    console.log(`You can browse at 127.0.0.1:${port}`)
});
