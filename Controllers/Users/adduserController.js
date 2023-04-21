const connection = require('../../Connection')
const bcrypt = require ('bcrypt');
const uuid = require('uuid');
const {v4 : uuidv4} = require('uuid')
const nodemailer = require("nodemailer");
const { sign } = require('jsonwebtoken')
const fs = require('fs');


const adduserController = async (req,res, next)=>{

// generate unique ID for users
 const userId =  uuidv4()
  req.userid = userId;
  




// convert passwrd to hash
const salt = await bcrypt.genSalt(10);
password = await bcrypt.hash(req.body.password, salt);



connection.query("SELECT * FROM users WHERE email = ? ", [req.body.email], function(error, results, fields) {

      if(error) throw error;

    if(results.length === 0){
     
      
      var sql = `INSERT INTO users ( userid,name, email, password, Active, Role, verified) VALUES ("${userId}","${req.body.name}", "${req.body.email}","${password}","1","0","0")`;


  
      connection.query(sql, function (err, result) {
        if (err) { res.status(200).json({status:500, msg:'Server Busy'})};
        console.log("1 record inserted, ID: " + result.insertId);
       
        const accesstoken = sign({userid:userId , email:req.body.email}, "showmethemeaningofbeinglonelythisisthefeelingimeantobe")
        // res.json({status:200,msg:'success',accesstoken:accesstoken})

        res.cookie("acessToken" , accesstoken, {
          expires:new Date(Date.now()+3000000),
          httpOnly:true
          
          }).status(200).json({status: 200, accesstoken:accesstoken});



        //  res.status(200).json({status: 200, accesstoken:accesstoken})


        let code = Math.floor(100000 + Math.random() * 900000)
        
         
        
        
        
        
        // Creating Referral Id
        const str = uuidv4();
        const Yourcode = str.slice(0, 8);

        connection.query(`INSERT INTO referral ( userid, yourcode, ReferralCode) VALUES ("${userId}", "${Yourcode.toUpperCase()}","${req.body.referralcode   }")`, (ers, rex) => {
          if (ers) throw ers;
          console.log("referral done")


        })




         // Creating Referral Id

      
        
        
        
        
        

        
        
        connection.query(`SELECT * FROM emailverification WHERE email = "${req.body.email}"` ,(errrr, result)=>{



          if(result.length){

          



            var sql = `UPDATE  emailverification SET  UserId="${userId}", vcode="${code}" WHERE  email="${req.body.email}" `;

            connection.query(sql, function (errr, result) {
                  if (errr) {throw errr}else{
          
                    console.log("1 record inserted, ID: " + result.insertId);
                    //  EMail start from here 
                    let transporter = nodemailer.createTransport({
                      service: 'gmail',
                      secure: 'false',
                      port:587,
                      auth: {
                        user: 'danish.k7a@gmail.com',
                        pass: 'gzsmjbpllltuiqag'
                      }
                    });
              
                    
                    
                    var mailOptions = {
                      from: 'contact@btccrypto.exchange',
                      to: req.body.email,
                      subject: 'Verification Code',
                      // text: `here is your ${code}`
                      html:`
                     
    <div style="background-color: #f2f2f2;display: flex; height:100vh;justify-content: center;align-items: center;font-family: roboto;flex-direction: column;">
    
 


    <div style="border: 1px solid rgb(225, 225, 225); width: 400px;background-color: white;">
      <div style="color:#5661ff;font-size: 24px;padding: 20px; text-align: center;font-weight: 700;">BCEX Exchange</div>
      <div style="color:rgb(29, 29, 29);font-size: 22px;padding: 20px;text-align: center;">Hi ${req.body.name}, Welcome to Bcex Exchange </div>

      <div style="padding: 40px;"></div>
      <div style="color:rgb(103, 103, 103);font-size: 16px;;text-align: center;">Here is your code :</div>
      <div style="color:rgb(34, 34, 34);font-size: 25px;padding: 10px;text-align: center;font-weight: 700;"> ${code}</div>
      
      <div style="display: flex;justify-content: center;align-items: center;" > <button style="background-color: #5661ff; color:rgb(255, 255, 255);font-size: 15px;padding: 10px;text-align: center;border: none;border-radius: 6px;"><a style="color: white;text-decoration: none;" href="http://btccrypto.exchange"> Start Trade</a></button></div>
    
<!-- 
     <div style="padding: 20px;display: flex;justify-content: center;align-items: center;"><img style="transform: rotate(-40deg);  filter: drop-shadow(-1px 0px 6px #5661ff)" src="http://localhost:3000/static/images/rocket.png" height="300px" width="300px" alt=""></div> -->
     <div style="padding: 40px;"></div>
    </div>

    
<div style="height: 600px; width: 400px; font-size: 12px;color: rgb(193, 193, 193);padding: 10px;">

This email was sent to ${req.body.email} because you recently signed into your Bcex Account.do not share this code with anybody else.
<br>
<br>
© 2023 Bcex Exchange | India

</div>
   </div >
                
                      
                      
                      
                        </div>
                
                
                
                   `
                
                
                    };
                   
                
                  
                
                
                    
                try{
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log("Hi" + error);
                    
                     
                      res.status(200).send("email failed")
                      


                    } else {
                      // res.send('email sent')
                      console.log('Email sent: ' + info.response);
                     
                        // res.status(200).send("new user added") 
                      res.status(200).json({ status: 200, msg: 'success' })
                      
                    }
                  }); 
                }catch(e){
              
                  print(e)
              
                }
                
          
          
          
                  }
                  
                });
                





                return next();


          }else{

            var sql = `INSERT INTO emailverification ( UserId, email, vcode) VALUES ("${userId}", "${req.body.email}","${code}")`;  
  connection.query(sql, function (errr, result) {
        if (errr) {throw errr}else{

          console.log("1 record inserted, ID: " + result.insertId);
          
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'danish.k7a@gmail.com',
              pass: 'gzsmjbpllltuiqag'
            }
          });
    
          
          
          var mailOptions = {
            from: 'contact@btccrypto.exchange',
            to: req.body.email,
            subject: 'Verification Code',
            // text: `here is your ${code}`
            html:` 
                     
            <div style="background-color: #f2f2f2;height:100vh;display: flex;justify-content: center;align-items: center;font-family: roboto;flex-direction: column;">
            
         
        
        
            <div style="border: 1px solid rgb(225, 225, 225); width: 400px;background-color: white;">
              <div style="color:#5661ff;font-size: 24px;padding: 20px; text-align: center;font-weight: 700;">BCEX Exchange</div>
              <div style="color:rgb(29, 29, 29);font-size: 22px;padding: 20px;text-align: center;">Hi ${req.body.name}, Welcome to Bcex Exchange </div>
        
              <div style="padding: 40px;"></div>
              <div style="color:rgb(103, 103, 103);font-size: 16px;;text-align: center;">Here is your code :</div>
              <div style="color:rgb(34, 34, 34);font-size: 25px;padding: 10px;text-align: center;font-weight: 700;"> ${code}</div>
              
              <div style="display: flex;justify-content: center;align-items: center;" > <button style="background-color: #5661ff; color:rgb(255, 255, 255);font-size: 15px;padding: 10px;text-align: center;border: none;border-radius: 6px;"><a style="color: white;text-decoration: none;" href="http://btccrypto.exchange"> Start Trade</a></button></div>
            
        <!-- 
             <div style="padding: 20px;display: flex;justify-content: center;align-items: center;"><img style="transform: rotate(-40deg);  filter: drop-shadow(-1px 0px 6px #5661ff)" src="http://localhost:3000/static/images/rocket.png" height="300px" width="300px" alt=""></div> -->
             <div style="padding: 40px;"></div>
            </div>
        
            
        <div style="height: 600px; width: 400px; font-size: 12px;color: rgb(193, 193, 193);padding: 10px;">
        
        This email was sent to ${req.body.email} because you recently signed into your Bcex Account.do not share this code with anybody else.
        <br>
        <br>
        © 2023 Bcex Exchange | India
        
        </div>
           </div >
                        
                              
                              
                              
                                </div>
                        
                        
                        
                           `
      
      
          };
         
      
        
      
      
          
      try{
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
          
            
            res.status(200).send("email failed")
          } else {
            // res.send('email sent')
            console.log('Email sent: ' + info.response);
        
            res.status(200).json({ status: 200, msg: 'success' })
               return next();
          }
        }); 
      }catch(e){
    
        print(e)
    
      }
      



        }
        
      });
      
      return next();

          }



        })
        
        
        






        
      });
    
      
  


      
     
    }else{
      return res.json({status:400,msg:'User Already Exists'})  

          
 


      
    }
    
  
  
  
 
 
 
  })







    // const Sendverification = ()=>{




  
     
  
  
  
  
  
  
  
  // }




  




  




// end
}
module.exports =adduserController;