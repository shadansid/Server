const CheckLoginController = async (req,res)=>{



    res.json({status:200,msg:req.token.email})

  



}
module.exports =CheckLoginController;