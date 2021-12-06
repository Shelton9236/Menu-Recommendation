var express = require('express');
var router = express.Router();
var db = require('../modules/db');

router.get('/', function (req, res) {

    id=req.query.id;

    db.query(`select name, description, step, ingredient, calorie, totalfat, totalcarbon, protein from recipe inner join recipe_raw using(reci_id) where reci_id=${id}`)
        .then(result => {

            recidata = JSON.parse(JSON.stringify(result[0]))[0];
            ingretext = recidata.ingredient;
            steptext = recidata.step;
            ingretext = JSON.stringify(ingretext).replace(/'/g, '"');
            ingretext = ingretext.substring(1, ingretext.length - 1);
            steptext = JSON.stringify(steptext).replace(/'/g, '"');
            steptext = steptext.substring(1, steptext.length - 1);
            recidata.ingredient = JSON.parse(ingretext);
            recidata.step = JSON.parse(steptext);

            res.status(200).json(recidata);
            console.log(recidata);

        }
        );
}
);

module.exports = router;