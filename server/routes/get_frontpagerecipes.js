var express = require('express');
var router = express.Router();
var db = require('../modules/db');

router.get('/', function (req, res) {

    tag_name = req.query.tag;

    if (tag_name == null) {
        db.query('select reci_id, name, minutes, n_step, n_ingredient from recipe order by RAND() limit 40')
            .then(result => {
                res.status(200).json(result[0]);
                console.log(result[0]);
            });
    }
    else {
        tag_id = 1;
        switch (tag_name) {
            case 'breakfast':
                tag_id = 141;
                break;
            case 'lunch':
                tag_id = 129;
                break;
            case 'dinner':
                tag_id = 28;
                break;
            case 'asian':
                tag_id = 31;
                break;
            case 'seafood':
                tag_id = 101;
                break;
            case 'holiday-event':
                tag_id = 165;
                break;
            case 'birthday':
                tag_id = 527;
                break;
        }
        db.query(`select r.reci_id, name, minutes, n_step, n_ingredient from recipe as r where r.reci_id in (select reci_id from recipe_tag where tag_id = ${tag_id}) order by RAND() limit 40`)
            .then(result => {
                res.status(200).json(result[0]);
                console.log(result[0]);
            });

    }


}
);

module.exports = router;