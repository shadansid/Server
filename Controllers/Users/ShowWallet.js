const connection = require('../../Connection')

const ShowWallet =(req, res)=>{


        let sql = `SELECT * FROM wallet WHERE UserId = "${req.token.userid}"`

        connection.query(sql , (err , results)=>{

            if(results.length){


               return res.status(200).json({msg:results})
      

            }
            else{

              
                res.status(200).json({msg:4});
            }

 

        })

}

module.exports = ShowWallet;