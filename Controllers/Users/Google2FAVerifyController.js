const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const connection = require('../../Connection')


const Google2FAVerifyController = (req, res) => {
    const { code } = req.body;
    const secret = '451617'; // retrieve the user's secret key from the database
  
    const verified = speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token: code,
    });
  
    if (verified) {
        res.json({ success: true });
    }

}

module.exports = Google2FAVerifyController;