const connection = require('../../Connection')
const axios = require('axios')
const TransferToHotWalletController = async (req,res, next)=>{

    // URL : http://43.205.22.194:8001/api/v1/TransferToHotWallet



    const response = await axios.post(`http://43.205.22.194:8001/api/v1/TransferToHotWallet`,   {
       
        "Contract": "0x589ef342C66c647d74a18C2E9421EAE30f1d0bC4",
        "FromWallet":"0xE23C6eD6b50391836085A4FEd6743F0E59Ea7797",
        "ApiKey":"E899JSF759RHVR5C5G1E14ESVWHY4YCK3Z",
        "ToWallet":"0x71e6331509Bc29C86240DAE7F8f79F479A834193"
    });
    
    const data = response.data;

    if (response.data.status === 'true' && response.data.status === 'Transection successfull' ) {
        res.json({msg:'Success', id:response.data.Transactions})

    }
    
    
    

    connection.query(`SELECT * FROM wallet WHERE userid = '${req.token.userid}' AND currency = "${"whatever"}"`, (err, res) => {

        if (res.length) {
                
            


        } else {
            res.json({msg:'insufficient'})
            }


})


  






}
module.exports =TransferToHotWalletController;