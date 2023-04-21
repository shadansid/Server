const connection = require("../../Connection");
const axios = require("axios");


const GetReferralDataController =  (req, res) => {
 
    connection.query(`SELECT * FROM referral WHERE userid = "${req.token.userid}"`, (err, result) => {
        if (err) throw err;
        if (result.length) {
            res.json(result)
        } else {
            
       }


    })


};

module.exports = GetReferralDataController;

