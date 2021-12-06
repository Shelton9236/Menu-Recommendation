var express = require('express');
var router = express.Router();
var db = require('../modules/db');

router.post('/', function (req, res) {

    reci_id=req.query.id;
    user_name=req.query.name;
        
    db.query(`select ingredient from recipe_raw where reci_id=${reci_id}`).then(
        result=>{
            ingretext = result[0][0].ingredient;
            
            ingretext=ingretext.replaceAll("'",'"');
            ingrearray=JSON.parse(ingretext);

            ingrearray.forEach((element,i) => {
                ingrearray[i]=[user_name,element]
            });
            ingrearray=[ingrearray];
            
            db.bulk(`insert into shoppinglist(user_name, ingredient) values ? on duplicate key update ingredient=ingredient`,ingrearray);
        }
    ).then(
        result=>{
            res.status(200).json({"status":"ok"});
        }
    );
    
    
}
);

module.exports=router;