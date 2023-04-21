const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const connection = require('../../Connection')


const Google2FAController =  (req, res) => {
const secret = speakeasy.generateSecret({ length: 20 });

  
  
  
    
  // Insert the secret key into the database
  connection.query('INSERT INTO gfa (id, secret) VALUES (?, ?)', [req.token.id, secret.base32], (err, result) => {
    if (err) throw err;
 


    QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
      if (err) {
        res.status(500).json({ error: 'Could not generate QR code' });
      } else {
        res.json({ secret: secret.base32, qr_code: data_url });
      }
    });
  





  })






 
 
  




}

module.exports = Google2FAController;