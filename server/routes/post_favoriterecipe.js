var express = require('express');
var router = express.Router();
var db = require('../modules/db');

router.post('/', function (req, res) {

    user_name=req.body.username;
    reci_id=req.body.recipeid;
        
    db.query(`insert into userfavorite(user_name, reci_id) values("${user_name}", ${reci_id})`)
    .then(
            result=>{
            res.status(200).json({"status":"ok"});
            }
    );
    
}
);

module.exports=router;