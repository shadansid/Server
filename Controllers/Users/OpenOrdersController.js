const connection = require('../../Connection')


const OpenOrdersController =  (req, res, next) => {
    

    connection.query(`SELECT * FROM orderbook WHERE status ='Pending'`, (err, result) => {
        if (err) throw err;
        res.json(result.reverse())


})
    
        
}

module.exports = OpenOrdersController;