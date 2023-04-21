const connection = require('../../Connection')

const AddrsToReactController = async (req,res, next)=>{


    let amount = req.body.amount;
    let coin = req.body.currency;

   

    let  endsymbol = (coin.toLowerCase()) + "address"

console.log(amount)
console.log(coin)

    connection.query(`SELECT * FROM addresses WHERE userid = "${req.token.userid}" `, (err, result) => {
        if (err) throw err;
        console.log( result[0][endsymbol])
        res.json({msg:result[0][endsymbol]})


    })
       
    
    
    
    



}
module.exports =AddrsToReactController;