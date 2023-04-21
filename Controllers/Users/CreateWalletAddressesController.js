const connection = require('../../Connection')
const bcrypt = require ('bcrypt');
const uuid = require('uuid');
const {v4 : uuidv4} = require('uuid')
const nodemailer = require("nodemailer");
const { sign } = require('jsonwebtoken')
const fs = require('fs');
const axios = require('axios')

const CreateWalletAddressesController = async (req,res)=>{

   

    const symbols = ['USDT', 'ETH', 'BTC']
    const Addresses = []
    const headers = {
        'Content-Type': 'application/json', // Replace with your desired content type
        'Authorization': 'Bearer your-access-token', // Replace with your actual authorization token
      };
      
    // console.log("ye hai id usr wali " + req.userid)
    for (let x of symbols) {
        const postdata = {
       
            // UserId: req.token.userid,
            UserId: req.userid,
             Currency:x,
             Website:"Testing.com"
           
        }
     
         const data = await axios.post(`http://43.205.22.194:8001/api/v1/CreateWallet`, postdata, {headers});
     
        Addresses.push({[x]:data.data.data.PublicAddress})

     
     
     

   }

    console.log(Addresses)

   


    // res.json({msg:'address crated'})




    connection.query(`INSERT INTO addresses (userid, usdtaddress, ethaddress, btcaddress)  VALUES("${req.userid}","${Addresses[0].USDT}","${Addresses[1].ETH}","${Addresses[2].BTC}" )`, (err, res) => {
        if (err) throw err;
        console.log("add hogye addresses")
        // res.json({msg:'address crated and save to db' })



    })    






}
module.exports =CreateWalletAddressesController;