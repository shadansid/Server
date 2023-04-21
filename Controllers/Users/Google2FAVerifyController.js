const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const connection = require('../../Connection')


const Google2FAVerifyController = (req, res) => {
   
    const { code } = req.body;
   


    // Get the user's secret key from the database
  connection.query('SELECT secret FROM gfa WHERE userid = ?', [req.token.userid], (err, results) => {
    if (err) throw err;

    // Verify the user's code
    const verified = speakeasy.totp.verify({
      secret: results[0].secret,
      encoding: 'base32',
      token: req.body.code
    });

    if (verified) {
      // User's code was verified, log them in
      req.session.isAuthenticated = true;
      res.redirect('/userpanel/userdashboard');
    } else {
      // User's code was not verified, show an error message
      res.render('login', { error: 'Invalid code' });
    }
  });










}

module.exports = Google2FAVerifyController;