const connection = require("../../Connection");
const axios = require("axios");


const GetAvailableCoinListController =  (req, res) => {
 
    connection.query(`SELECT * FROM coinlist`, (err, result) => {
        if (err) throw err;
        res.json(result)


    })


};

module.exports = GetAvailableCoinListController;

