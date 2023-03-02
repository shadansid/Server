const connection = require('../../Connection')
const axios  = require('axios');

const AvblSellController = async (req, res)=>{
let symbol = req.body.symbol
let backedCoin = symbol.substr(symbol.length - 4);
let Coin = symbol.substring(0, symbol.length - 4);


// console.log(backedCoin)
// console.log(Coin)
// console.log(req.token.userid)


connection.query(`SELECT * FROM wallet WHERE UserId = "${req.token.userid}" AND currency = "${Coin.toLowerCase()}"`, (err,result)=>{

    if(err) throw err;
    if(result.length){

                // console.log("hello AVBL here ")
            res.json({msg:result[0].quantity})
    
    }else{
        res.json({msg:0.00})
    }


})


  
    
        
}

module.exports = AvblSellController;