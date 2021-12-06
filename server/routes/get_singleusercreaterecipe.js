var express = require('express');
var router = express.Router();
var db = require('../modules/db');

router.get('/', function (req, res) {
    reci_id=req.query.id;
    db.query(`select recipe_name, submitted_date, description, minutes, n_step, n_ingredient, step, ingredient from usercreaterecipe where reci_id=${reci_id}`)
    .then( result=>{
        data=result[0][0];
        
        //Split based on ';' for step, ','for ingredient
        
        stepfield=data.step.split(';');
        ingredientfield=data.ingredient.split(',');

        //Pack to jsonarray
        data.step=stepfield;
        data.ingredient=ingredientfield;
        
        //Send data
        res.status(200).json(data);
        console.log(data);
    });

}
);

module.exports=router;