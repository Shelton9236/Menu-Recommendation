var express = require('express');
var router = express.Router();
var db = require('../modules/db');

router.get('/', function (req, res) {

    user_name=req.query.user_name;

    db.query(`select reci_id, submitted_date, recipe_name as name, description, minutes, n_step, n_ingredient, step, ingredient from usercreaterecipe where user_name="${user_name}" order by date(submitted_date) desc`)
        .then(result => {

            res.status(200).json(result[0]);
            console.log(result[0]);

        }
        );
}
);

module.exports = router;