// ==========================Express Basic=================================
const express = require('express');
const router = express.Router();
// =======================img=======================================

// const multer = require('multer')
const path =require('path')
// const upload = multer({ dest: 'Public/userdoc/' })
// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{

//         cb(null,'images')
//     },
//     filename:(req,file,cb)=>{
    
//         cb(null,req.token.email + path.extname(file.originalname))
//     }

// })
// const upload = multer({storage:storage})


const multer = require('multer');

// Set up the Multer storage engine with a custom filename
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'Public/userdoc/');
  },
  filename: (req, file, callback) => {
    callback(null, req.token.userid + path.extname(file.originalname));
  }
});

// Set up the Multer upload middleware with the storage engine
const upload = multer({ storage });










// ========================Users Controllers==============================
const CoinOfflineController = require('../Controllers/Users/CoinOfflineController');
const adduserController = require('../Controllers/Users/adduserController')
const BuyCoinController = require('../Controllers/Users/BuyCoinController')
const SellCoinController = require('../Controllers/Users/SellCoinController')
const loginController = require('../Controllers/Users/loginController')
const Sendverification = require('../Controllers/Users/Sendverification')
const VerifyUser = require('../Controllers/Users/VerifyUser')
const payment = require('../Controllers/Users/Payment');
const TestController = require('../Controllers/Users/TestController')
const TradeHistoryController = require('../Controllers/Users/TradeHistoryController')
const ConfirmPaymentController = require('../Controllers/Users/ConfirmPaymentController')
const ShowTradeHistoryController = require('../Controllers/Users/ShowTradeHistoryController')
const ShowWallet = require('../Controllers/Users/ShowWallet')
const TestPurpose = require('../Controllers/Users/TestPurpose')
const AvblController = require('../Controllers/Users/AvblController')
const WidthrawController = require('../Controllers/Users/WidthrawController')
const Showtotal = require('../Controllers/Users/Showtotal')
const CustomCoinController = require('../Controllers/Users/CustomCoinController')
const CallBackController = require('../Controllers/Users/CallBackController')
const InternalWithdrawController = require('../Controllers/Users/InternalWithdrawController')
const Userkyc = require('../Controllers/Users/UserkycController')
const LogOutController = require('../Controllers/Users/LogOutController')
const CheckLoginController = require('../Controllers/Users/CheckLoginController')
const ExternalWithdrawController = require('../Controllers/Users/ExternalWithdrawController')
const LimitController = require('../Controllers/Users/LimitController')
const LimitNextController = require('../Controllers/Users/LimitNextController')
const AvblSellController = require('../Controllers/Users/AvblSellController')
const OrderBookController = require('../Controllers/Users/OrderBookController')
const OpenOrdersController = require('../Controllers/Users/OpenOrdersController')
const CheckVerifiedController = require('../Controllers/Users/CheckVerifiedController')

// ============================Middlewares=================================
const Authjwt = require('../Middlewares/Authjwt');
const verifyPay = require('../Middlewares/verifyPay');
const Google2FAController = require('../Controllers/Users/Google2FAController');
const Google2FAVerifyController = require('../Controllers/Users/Google2FAVerifyController');

//============================= Routes=====================================


router.get('/getcoin',CoinOfflineController)
router.post('/adduser',adduserController)
router.post('/login',loginController)
router.post('/test',Sendverification)
router.post('/VerifyUser',Authjwt,VerifyUser)



// wallet Update
router.post('/buycoin' , Authjwt, BuyCoinController)
router.post('/sellcoin' ,Authjwt, SellCoinController)
router.post('/avbl' ,Authjwt, AvblController)
router.post('/avblsell' ,Authjwt, AvblSellController)
router.post('/limit' ,Authjwt, LimitController,LimitNextController)

// router.post('/limitnext' ,LimitNextController)



router.post('/userkyc' ,Authjwt,upload.single('image'), Userkyc)
router.get('/logout' ,Authjwt, LogOutController)
router.get('/checklogin' ,Authjwt, CheckLoginController)


// Widthrawal
router.post('/Widthraw' ,Authjwt, WidthrawController)
router.post('/InternalWithdraw' ,Authjwt, InternalWithdrawController)
router.post('/externalWithdraw' ,Authjwt, ExternalWithdrawController)



// custom Coin
router.get('/customdata' , CustomCoinController)

// Transaction Routes
router.post('/addmoney',Authjwt,payment, BuyCoinController)
router.post('/cnpay',Authjwt,ConfirmPaymentController)
router.post('/pay',Authjwt,TestController, TradeHistoryController)
router.post('/callback',Authjwt,CallBackController)


router.post('/verifyPay',Authjwt,verifyPay)

// Trade History
router.post('/tradehis',TradeHistoryController)
router.get('/orderbook',Authjwt,OrderBookController)
router.get('/openorder',Authjwt,OpenOrdersController)
router.get('/showtrade',Authjwt,ShowTradeHistoryController)
router.get('/showwallet',Authjwt,ShowWallet)
router.get('/Showtotal',Authjwt,Showtotal)
router.get('/testpp', Authjwt, TestPurpose)



router.get('/checkverified', Authjwt, CheckVerifiedController)


// Google 2FA
router.post('/api/2fa/setup',Authjwt,Google2FAController)
router.post('/api/2fa/verify',Authjwt,Google2FAVerifyController)





module.exports = router;