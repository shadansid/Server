const connection = require('../../Connection')
const axios  = require('axios');

const Showtotal = async (req, res)=>{



    let sql = `SELECT * FROM wallet WHERE UserId = "${req.token.userid}"`

    connection.query(sql , (err , results)=>{

        if(results.length){


            res.json(results)

        }
        else{

            // res.json({msg:"Nothing to Show"})
        }



    })

  
    
        
}

module.exports = Showtotal;