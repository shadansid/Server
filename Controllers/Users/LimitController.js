const connection = require('../../Connection')
const axios  = require('axios');
const WebSocket = require('ws');
const {v4 : uuidv4} = require('uuid')





const LimitController =  (req, res, next) => {
    
  const orderid =  uuidv4()
    let symbol = (req.body.symbol).toLowerCase();
    let amount  = req.body.amount;
    let limitprice = req.body.limitprice;

  connection.query(`SELECT * FROM orderbook WHERE currency = '${symbol}' AND price = '${limitprice}'`, (err, data) => {
    if (err) throw err;
    if (data.length) {
        
  res.json({msg:'Order Exist Already'})



    } else {
      
      var sql = `INSERT INTO orderbook (userid,orderid,currency,price,amount,status) VALUES("${req.token.userid}","${orderid}","${symbol}","${limitprice}","${amount}","Pending")`;
 
      connection.query(sql, (err, result) => {
          if (err) throw err;
          console.log('inserted.........')
          res.json({msg:'Order Created'})
    
    
    
      })


    }



      })

  
  
  




//     const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@trade`);
   
    

// ws.on('open', function open() {
//         console.log('Connected to Binance WebSocket');
//       });
      
//       ws.on('message', function incoming(data) {
//         // console.log('Received data: ',  data);
//         try {
//             const jsonData = JSON.parse(data);
//             // console.log('Converted to JSON: ', jsonData);
//             // console.log('Converted to JSON: ', jsonData.s);

//             // console.log('Converted to JSON: ', jsonData.p);

//             while(1){
           
//                 if(limitprice == jsonData.p){
//                     ws.close()    
//                     return next();
                        
               
//                 }
              
//             }
          
        
//         }
          
//           catch (err) {
//             console.error('Failed to parse data to JSON: ', err);
//           }
      
//     });
      
//       ws.on('close', function close() {
//         console.log('Disconnected from Binance WebSocket');
//       });
      


//       ws.on('error', function error(err) {
//         console.error('WebSocket error: ', err);
//       });
      






    
        
}

module.exports = LimitController;