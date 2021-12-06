var express = require('express');
var router = express.Router();
var db = require('../modules/db');

router.post('/', function (req, res) {

    reci_id=req.body.recipeid;
    user_id=88888;
    submitted_date=new Date().toISOString().slice(0, 10);
    rating=req.body.rating;
    review=req.body.review;
        
    db.query(`insert into review(reci_id,user_id,submitted_date,rating,review) values(${reci_id}, ${user_id}, "${submitted_date}", ${rating}, "${review}")`)
    .then(
            result=>{
            res.status(200).json({"status":"ok"});
            }
    );
    
}
);

module.exports=router;