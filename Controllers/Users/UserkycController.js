const connection = require('../../Connection')
const UserkycController = (req, res) => {
  

    let name = req.body.name;
    let adhar = req.body.adhar;
    let phone = req.body.phone;
    let pancard = req.body.pancard;
    const userId = req.token.userid;

    let sql  = `UPDATE users SET Pancard = "${pancard}", adharcard ="${adhar}", Phone ="${phone}" WHERE userid = "${userId}"`;
   
    // let sql = `INSERT INTO users (Pancard ,adharcard ,Phone) VALUES("${pancard}","${adhar}" , "${phone}") WHERE userid = "${req.token.userid}"`
    
    connection.query(sql, (err, results) => {
        if(err) throw err;
        console.log("Kyc Updated...")
        // res.setHeader('Content-Type', 'text/plain');
        // return res.send('Submitted !');
    
    
    })





res.json({msg:"working"})
    
        
}

module.exports = UserkycController ;