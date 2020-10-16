const e = require("express");
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
    Customer.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving customers."
            });
        else res.send(data);
    })
};

//Get a single Customer 
exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send ({
                    message: `Customer with id ${req.params.customerId} not found.`
                })
            } else {
                res.status(500).send ({
                    message: "Error retrieving Customer with id " + req.params.customerId
                });
            }
        }else res.send(data);
    });
};

//Update a customer
exports.update = (req, res) => {
    //Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    //Update Customer
    Customer.updateById(
        req.params.customerId,
        new Customer(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Customer with id ${req.params.customerId} not found.`
                    });

                }else {
                    res.status(500).send({
                        message: "Error update Customer with id " + req.params.customerId
                    })
                }
            }else res.send(data);
        }
    )
};

// Delete a customer
exports.delete = (req, res) => {
    Customer.remove(req.params.customerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message:`Customer with id ${req.params.customerId} not found.`
                });
            }else {
                res.status(500).send({
                    message: "Could not delete Customer with id " + req.params.customerId
                });
            }
        }else res.send({message: `Customer was deleted successfully!`})
    })

};

//Delete all Customers
exports.deleteAll = (req, res) => {
   Customer.removeAll((err, data) => {
      if (err) {
          res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
        }else { res.send({ message: `All Customers were deleted successfully!` }); } 
    })
}
