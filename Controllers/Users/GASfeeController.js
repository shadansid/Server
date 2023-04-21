const connection = require('../../Connection')
const axios = require('axios')
const GASfeeController = async (req,res, next)=>{

// URL : https://busd.superbtron.com/?PKEYT=<pay_out_wallet_private_key>&ToAddressT=<user deposit address>&AmountT=.04



    const response = await axios.post(`https://busd.superbtron.com/?PKEYT=<pay_out_wallet_private_key>&ToAddressT=<user deposit address>&AmountT=.04`);
    
    const data = response.data;


    
    
    



}
module.exports =GASfeeController;