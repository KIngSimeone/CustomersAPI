model.exports = app => {
    const customers = require("../controllers/customer.controler.js");

    //Create New Customer
    app.post('/customers', customers.create);

    //Get all Customers
    app.get('/customers', customers.findAll);

    //Get a single customer with customerId
    app.get('/customers/:customerId', customers.findOne);

    //Update a customer
    app.put('/customers/:customerId', customers.update);

    //Delete a Customer
    app.delete('/customers/:customerId', customers.delete);

    //Delete All Customers
    app.delete("/customers", customers.deleteAll);

}
