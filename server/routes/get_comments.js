var express = require('express');
var router = express.Router();
var db = require('../modules/db');

router.get('/', function (req, res) {

    id=req.query.id;

    db.query(`select user_id, submitted_date, rating, review from review where reci_id=${id} order by rating desc limit 3`)
        .then(result => {

            res.status(200).json(result[0]);
            console.log(result[0]);

        }
        );
}
);

module.exports = router;