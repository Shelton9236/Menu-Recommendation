var express = require('express');
var router = express.Router();
var db = require('../modules/db');

router.get('/', function (req, res) {
    user_name=req.query.name;
    db.query(`select ingredient from shoppinglist where user_name='${user_name}'`)
    .then( result=>{
        data=result[0];
        
        
        //Send data
        res.status(200).json(data);
        console.log(data);
    });

}
);

module.exports=router;