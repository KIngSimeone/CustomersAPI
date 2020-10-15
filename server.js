const express = require("express");
const bodyParser = require("body-parser")

//Init express app 
const app = express();

//parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

//sample route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to The Customer API"});
});


//set routes path
require("./app/routes/customer.routes.js")(app);

//set PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port${port}....`))