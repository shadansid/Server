// ==========================Express Basic=================================
const express = require('express');
const router = express.Router();

// ========================admin Controllers==============================
const Getallusers = require('../Controllers/Admin/Getallusers')
const Airdrop = require('../Controllers/Admin/Airdrop')
const AllowUsers =require('../Controllers/Admin/AllowUsers')
const AddCustomCoin = require('../Controllers/Admin/AddCustomCoin')

// ============================Middlewares=================================
const Authjwt = require('../Middlewares/Authjwt');


// ===============================img====================================

const multer = require('multer')
const path =require('path')
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{

        cb(null,'./Public/images/CoinImage/')
    },
    filename: (req, file, cb) => {
        let symbol  = req.body.symbol;
  let backedCoin = symbol.substr(symbol.length - 4);
  let Coin = symbol.substring(0, symbol.length - 4);
  
    
        cb(null, Coin.toUpperCase() + path.extname(file.originalname))
    }

})
const upload = multer({storage:storage})

// =======================img=======================================










//============================= Routes=====================================
router.get('/getallusers',Getallusers)
router.post('/AllowUsers',AllowUsers)
router.post('/airdrop',Airdrop)
router.post('/addcustomcoin', upload.single('image'),AddCustomCoin)

module.exports = router;