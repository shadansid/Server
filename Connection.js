 const mysql = require('mysql');  


 const Connection = mysql.createConnection({  
host: "localhost",  
user: "root",  
password: "",
database:"bynance",
// socketPath: '/var/run/mysqld/mysqld.sock'
 });  


 
Connection.connect(function (err) {
    if(err){
        console.log("Bhnchod Error !");
    }
    else{
        console.log("sab set hai veere !");
    }
 });
 
   
module.exports = Connection;