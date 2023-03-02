const connection = require('../../Connection')
const EmailLead =  (req,res)=>{

    connection.query(`INSERT INTO emaillead`)
    
    res.json({status:'200',msg:'Success'})
      
  
  }
  
  module.exports = EmailLead