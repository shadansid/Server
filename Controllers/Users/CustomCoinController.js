const connection = require('../../Connection')
const CustomCoinController =  async (req,res)=>{

let symbol = req.body.symbol
let amount  = req.body.amount

    
    let sql = `SELECT * FROM customcoin`
    connection.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length) {
                res.json(result)


        }




    })


    

}

module.exports = CustomCoinController