const sql = require("./db.js");

// constructor

const Customer = function(customer) {
    this.email = customer.email;
    this.name = customer.name;
    this.active = customer.active;
};


//Create Customer
Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) =>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created customer: ", {id: res.insertId, ...newCustomer});
        result(null, {id: res.insertId, ...newCustomer});
    });
};

//Find customer
Customer.findById = (customerId, result) => {
    sql.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.lenght) {
            console.log("foundcustomer: ", res[0]);
            result(null, res[0]);
            return;
        }

        //Customer with the Id not found
        result({kind: "not_found"}, null);
    });

};

//Get all customers
Customer.getAll = result => {
    sql.query("SELECT * FROM customers", (err, res) =>{
        if (err) {
            console.log("error: ", err);
            result(null,err);
            return;
        }

        console.log("customers: ", res);
        result(null,res);
    });
};


// Update Customer
Customer.updateById = (id, customer, result) => {
    sql.query(
        "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
        [customer.email, customer.name, customer.active, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return; 
            }

            if (res.affectedRows == 0) {
                //Customer with the ID not found
                result({ kind: "not_found"}, null);
                return;
            }

            console.log("updated customer: ", {id: id, ...customer});
            result(null, {id:id, ... customer});
        }

    );
};

//Delete Single Customer
Customer.remove = (id, result) => {
    sql.query("DELETE FROM customers WHERE id = ?", id, (err,res) =>{
      if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
      }
      
      console.log("deleted customer with id: ", id);
      result(null,res);
    });
}

//Delete All Customers
Customer.removeAll = result => {
    sql.query("DELETE FROM customers", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} customers`);
        result(null, res);
    });
};


module.exports = Customer