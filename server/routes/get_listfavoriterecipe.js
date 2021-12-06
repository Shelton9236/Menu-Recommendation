var express = require('express');
var router = express.Router();
var db = require('../modules/db');

router.get('/', function (req, res) {

    user_name=req.query.user_name;

    db.query(`select reci_id, name, minutes, n_step, n_ingredient from recipe where reci_id in (select reci_id from userfavorite where user_name = "${user_name}")`)
    .then( result=>{
        res.status(200).json(result[0]);
        console.log(result[0]);
    });

}
);

module.exports = router;