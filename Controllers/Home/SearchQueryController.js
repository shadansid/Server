const connection = require('../../Connection')
const axios  = require('axios');

const SearchQueryController =  (req, res)=>{
   let query =  req.params.query

       
    let sql = `SELECT * FROM coinlist`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
   
  
        
        if (query !== '') {
     
            const filteredResult = result.filter((e) => {
                let data = e.symbol.toLowerCase().includes(query.toLowerCase());
                return data;
            });
            
            console.log(filteredResult);
            res.json(filteredResult);
            

        } else {
            
            // res.json(result)
 }
    



    })
    
    
    
        
}

module.exports = SearchQueryController;