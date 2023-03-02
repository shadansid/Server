const connection = require('../../Connection')
const CheckVerifiedController = async (req,res)=>{


 

connection.query("SELECT * FROM users WHERE userid = ? ", [req.token.userid], function(error, results, fields) {
     
    res.json(results[0].Active)
    console.log(results[0].Active)
    // res.send('MTVSPIT')

    })



}
module.exports =CheckVerifiedController;






