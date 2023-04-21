const connection = require('../../Connection')
const UserProfileController = (req, res) => {
  
    
    connection.query(`SELECT * FROM users WHERE email = "${req.token.email}"`, (err, result) => {
            
        res.json(result);
        // console.log(result)

      

    })
    


    
}

module.exports = UserProfileController ;