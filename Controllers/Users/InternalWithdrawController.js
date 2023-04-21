const connection = require("../../Connection");
const axios = require("axios");
const InternalWithdrawController = async (req, res) => {
 
  let coin = req.body.wcoin;
  let amount = req.body.wamount;
  let email = req.body.wemail;
  let coinPrice = 1;

if (coin !== "USDT") {
    const Cp = await axios.get(
      `https://api.binance.com/api/v3/ticker/price?symbol=${coin}USDT`
    );
    console.log("this is coin price" + Cp);
    console.log("this is coin price" + Cp.data.price);
    coinPrice = Cp.data.price;
  }

  connection.query(
    `SELECT * FROM wallet WHERE currency ="${coin}" AND UserId ="${req.token.userid}"`,
    (err, result) => {
      if (err) throw err;
      if (result.length) {
          console.log(result[0].quantity + "Isme hai coin");
      

        connection.query(
          `SELECT * from users WHERE email = "${email}" `,
          (errr, response) => {
            if (errr) throw errr;
            console.log("yaha b aagya")
            if (response.length) {
              if (result[0].quantity * coinPrice >= amount) {
             
  
                connection.query(`START TRANSACTION`, (err, res) => {
                  if (err) throw err;
                  console.log("transaction applied");
                  
                  connection.query(`SELECT * FROM wallet WHERE userid = '${response[0].userid}'`, (rroor, returndata) => {
                    if (err) throw err;
                    if (returndata.length) {

                      connection.query(
                        `UPDATE wallet SET quantity = "${returndata[0].quantity + amount}" WHERE symbol="${coin} && email = '${email}'`, (xyz, resulit) => {
                          if (err) throw err;
                          connection.query(`COMMIT`, (ert, ou) => {
                            if (err) throw err;
                            console.log("Commit");
                          })
                        });
  
                    }

                    
                    })

                  
                });
              } else {
                res.json({status: 400, msg: "insuffiecient amount" });
                console.log("ni h balance itna isme");
              }
            } else {
              res.json({status: 400, msg: "User not found" });
              console.log("user ni h isme");
            }
          }
        );








        }


    }
  );

    






};

module.exports = InternalWithdrawController;

