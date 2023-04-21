const connection = require('../../Connection')
const axios = require('axios')

const CheckingPaymentLoopController = async (req,res, next)=>{

    let address = req.body.address;
    let inputdata = req.body.inputdata;
    let currency = req.body.currency;

    // console.log("xx2  "+address)
    // console.log("xx2 " + inputdata)
    
    const response = await axios.get(`https://api.bscscan.com/api?module=account&action=tokentx&${currency == 'usdt'?'contractaddress=0x55d398326f99059ff775485246999027b3197955':null}&address=${address}&apikey=E899JSF759RHVR5C5G1E14ESVWHY4YCK3Z`);
    
    const data = response.data;
    let myval;
   
   
   
   
   
    if (data.result.length) {
        
        console.log(data.result[0])
        let str = '1'
        let decimal = data.result[0].tokenDecimal
         myval = data.result[0].hash
        
for (let i = 0; i < decimal; i++){

    str += 0;
    
}

let num = parseInt(str);

        const amount = data.result[0].value / num;
        console.log(amount)



    connection.query(`SELECT hash FROM payments WHERE userid = "${req.token.userid}  "`, (ers, ress) => {
        if (ers) throw ers;
        console.log(ress)

        if (ress.length) {
            
            
for(let x of ress){
    
    if(x.hash === myval) {
        console.log("fail")
        return 0;
        
    }
}


        if (amount === inputdata){
            
//   Store every time first response 
  
connection.query(`INSERT INTO payments (userid ,fromaddsr , toaddsr , contractaddsr, coin, amount, hash, timestamp) VALUES("${req.token.userid}","${data.result[0].from}","${data.result[0].to}","${data.result[0].contractAddress}","${data.result[0].tokenSymbol}","${amount}","${data.result[0].hash}","${formattedDateTime}")`, (err, res) => {
    if (err) throw err;
    console.log("INSERTED")
    return next()

})





        }
  
      






        } else {
            
            if (amount === inputdata){
            
                //   Store every time first response 
                  
                connection.query(`INSERT INTO payments (userid ,fromaddsr , toaddsr , contractaddsr, coin, amount, hash, timestamp) VALUES("${req.token.userid}","${data.result[0].from}","${data.result[0].to}","${data.result[0].contractAddress}","${data.result[0].tokenSymbol}","${amount}","${data.result[0].hash}","${formattedDateTime}")`, (err, res) => {
                    if (err) throw err;
                    console.log("INSERTED")
                    return next()
                
                })
                
                
                
                
                
                        }





        }
    
    
    
    
    
    
    
    
    })
 

    } else {
        console.log("no record found")

            // re run request













}



}
module.exports =CheckingPaymentLoopController;