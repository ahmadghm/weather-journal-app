// Setup empty JS object (endpoint for all routes)
projectData = {}; // JavaScript Object named

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();

/* Middleware */
// Configure express (Middleware body-parser)
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());

// Use Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize main project folder
app.use(express.static("website")); // main folder is website of content

// Setup Server
const server = app.listen(1515, () => {
    // using port 1515 to listen
    console.log("listnening on port *-*", 1515); //console on terminal
});

app.get("/all", (req, res) => {
    // get function
    res.send(JSON.stringify(projectData));
});

app.post("/", (req, res) => {
    //  post function  => return the 4 main values
    projectData.city = req.body.city; // city name of entry zipcode
    projectData.temperature = req.body.temperature; // temperature
    projectData.date = req.body.date; // date of request
    projectData.userFeeling = req.body.userFeeling;
    res.end();
});
