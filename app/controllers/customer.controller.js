const Customer = require("../models/customer.model.js")

//Create and save a new Customer
exports.create = (req, res) => {
    //Validate request
    if (!req.body) {
        res.status(400).send({
            message:"Content can not be empty!"
        });
    }

    //Create Customer
    const customer = new Customer ({
        email: req.body.email,
        name: req.body.active
    })

    //Save Customer
    Customer.create(customer, (err, data) => {
        if (err)
        res.status(500).send({
            message:
                err.message || "Some error occured while creating the Customer."
        });
        else res.send(data);
    });
};

// Get all Customers
exports.findAll = (req, res) => {

};

//Get a single Customer 
exports.findOne = (req, res) => {

};

//Update a customer
exports.update = (req, res) => {

};

// Delete a customer
exports.delete = (req, res) => {

};

//Delete all Customers
exports.deleteAll = (req, res) => {

};