const connection = require('../../Connection')
const axios  = require('axios');

const SearchQueryController =  (req, res)=>{
   let query =  req.params.query

       
    let sql = `SELECT symbol FROM coinlist`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        result.map((e) => {
            if (query == e.symbol) {
                res.json({msg:e.symbol})
            } else {
                res.json({msg:'Nothing to Show'})
            }

       })
       
       
        // console.log(typeof(result))


    })
    
    
    
        
}

module.exports = SearchQueryController;