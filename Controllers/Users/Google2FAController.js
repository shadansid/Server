const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const connection = require('../../Connection')


const Google2FAController =  (req, res) => {
const secret = speakeasy.generateSecret({ length: 20 });

  QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
    if (err) {
      res.status(500).json({ error: 'Could not generate QR code' });
    } else {
      res.json({ secret: secret.base32, qr_code: data_url });
    }
  });

        
}

module.exports = Google2FAController;