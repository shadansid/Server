const connection = require('../../Connection')


const OrderBookController =  (req, res, next) => {
    

    connection.query(`SELECT * FROM orderbook WHERE userid = '${req.token.userid}'`, (err, result) => {
        if (err) throw err;
        res.json(result.reverse())


})
    
        
}

module.exports = OrderBookController;