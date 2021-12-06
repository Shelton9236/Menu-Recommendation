var express = require('express');
var router = express.Router();
var db = require('../modules/db');

router.post('/', function (req, res) {

    user_name=req.body.username;
    submitted_date=new Date().toISOString().slice(0, 10);
    recipe_name=req.body.recipename;
    description=req.body.description;
    minutes=req.body.minutes;
    n_step=req.body.nstep;
    n_ingredient=req.body.ningredient;
    step=req.body.step;
    ingredient=req.body.ingredient;
    
        
    db.query(`insert into usercreaterecipe(user_name,submitted_date,recipe_name,description, minutes, n_step, n_ingredient, step, ingredient) 
    values("${user_name}", "${submitted_date}", "${recipe_name}", "${description}", ${minutes}, ${n_step}, ${n_ingredient}, "${step}", "${ingredient}")`)
    .then(
            result=>{
            res.status(200).json({"status":"ok"});
            }
    );
    
}
);

module.exports=router;