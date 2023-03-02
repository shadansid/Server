const connection = require('../../Connection')
const multer = require('multer')


const AddCustomCoin =(req, res)=>{
    let symbol  = req.body.symbol;
    let quantity = req.body.quantity;
  let price = req.body.initprice;

  
  let backedCoin = symbol.substr(symbol.length - 4);
  let Coin = symbol.substring(0, symbol.length - 4);
  
  console.log(symbol + quantity + price)
    
  let sql = `INSERT INTO coinlist (symbol,coinimg,quantity, price,custom) VALUES ("${symbol}","http://localhost:8800/static/images/coinimage/${Coin}.png", "${quantity}","${price}","1")`

 connection.query(sql, (err,result)=>{

if(err) throw err;

   res.send('coin added')
   console.log("coin added")
  


  })
    

    
        
            
    }
    
module.exports = AddCustomCoin ;
