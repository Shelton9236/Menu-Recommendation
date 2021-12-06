var express = require('express');
var router = express.Router();
var db = require('../modules/db');

function caldailynut(age, height, weight, gender, workout, diet) {

    var pa;
    var calorie;
    var pap;
    var protein;
    var carbo;
    var fat;

    if (gender == "male") {
        if (workout == true && diet == false) {
            pa = 1.54;
        }
        else if (workout == false && diet == true) {
            pa = 1.0;
        }
        else if (workout == false && diet == false) {
            pa = 1.12;
        }
        else if (workout == true && diet == true) {
            pa = 1.27;
        }
        calorie = 864 - 9.72 * age + pa * (14.2 * weight + 503 * height);
    }
    else if (gender == "female") {
        if (workout == true && diet == false) {
            pa = 1.45;
        }
        else if (workout == false && diet == true) {
            pa = 1.0;
        }
        else if (workout == false && diet == false) {
            pa = 1.14;
        }
        else if (workout == true && diet == true) {
            pa = 1.27;
        }
        calorie = 387 - 7.31 * age + pa * (10.9 * weight + 660.7 * height);
    }

    //Unit in gram
    if (workout == true && diet == false) {
        pap = 2.0;
    }
    else if (workout == false && diet == true) {
        pap = 1.0;
    }
    else if (workout == false && diet == false) {
        pap = 1.2;
    }
    else if (workout == true && diet == true) {
        pap = 1.4;
    }

    protein = weight * pap;
    carbo = calorie * 0.01375;
    fat = calorie * 0.0333;

    return { calorie, protein, carbo, fat };

}

function query_ingredient(ingredients) {
    var str_ingredient = "";
    for (i of ingredients) {
        str_ingredient += ` intersect select reci_id from (select ingredient_id from ingredient where ingredient_name like \'%${i.toLowerCase()}%\')as ${i} inner join recipe_ingredient using(ingredient_id)`;
    }
    str_ingredient = str_ingredient.slice(11);
    return str_ingredient;
}

function query_mealtype(mealtype) {
    if (mealtype == "breakfast") {
        str_mealtype = "select reci_id from (select tag_id from tag where tag_name like \'%breakfast%\')as breakfast inner join recipe_tag using(tag_id)";
    }
    else if (mealtype == "lunch") {
        str_mealtype = "select reci_id from (select tag_id from tag where tag_name like \'%lunch%\')as lunch inner join recipe_tag using(tag_id)";
    }
    else if (mealtype == "dinner") {
        str_mealtype = "select reci_id from (select tag_id from tag where tag_name like \'%cuisine%\' or tag_name like \'%dish%\')as dinner inner join recipe_tag using(tag_id)";
    }
    else if (mealtype == "snack") {
        str_mealtype = "select reci_id from (select tag_id from tag where tag_name like \'%snack%\')as snack inner join recipe_tag using(tag_id)";
    }
    return str_mealtype;
}

function query_time(time) {
    var str_time = `select reci_id from recipe where minutes <= ${time}`
    return str_time;
}

function query_region(region) {
    var str_region = `select reci_id from (select tag_id from tag where tag_name like \'${region.toLowerCase()}\')as ${region} inner join recipe_tag using(tag_id)`;
    return str_region;
}

function query_dishtype(dishtype) {
    var str_dishtype = "";
    if (dishtype == "main dish") {
        str_dishtype = "select reci_id from (select tag_id from tag where tag_name like \'%main-dish%\' or tag_name like \'one-dish-meal\')as maindish inner join recipe_tag using(tag_id)";
    }
    else if (dishtype == "side dish") {
        str_dishtype = "select reci_id from (select tag_id from tag where tag_name like \'%side-dishes%\')as sidedish inner join recipe_tag using(tag_id)";
    }
    else if (dishtype == "appetizer") {
        str_dishtype = "select reci_id from (select tag_id from tag where tag_name like \'appetizers\' or tag_name like \'%sweet%\')as appetizers inner join recipe_tag using(tag_id)";
    }
    return str_dishtype;
}

function query_vegetarian(vegetarian) {
    var str_vegetarian = "";
    str_vegetarian = "select reci_id from (select tag_id from tag where tag_name like \'vegetarian\')as vegetarian inner join recipe_tag using(tag_id)";
    return str_vegetarian;
}

router.post('/', function (req, res) {

    var name = "testuser";
    var age = 25;
    var height = 1.75;
    var weight = 65;
    var gender = "male";

    if ("name" in req.body) {
        name = req.body.name.toLowerCase();
    }
    if ("age" in req.body) {
        age = req.body.age;
    }
    if ("height" in req.body) {
        height = req.body.height;
    }
    if ("weight" in req.body) {
        weight = req.body.weight;
    }
    if ("gender" in req.body) {
        gender = req.body.gender.toLowerCase();
    }

    //Boolean values
    var vegetarian = req.body.vegeterian;
    var diet = req.body.diet;
    var postworkout = req.body.postWorkout;

    //Data
    var region = req.body.region.toLowerCase();
    var time = req.body.prepareTime;
    var mealtype = req.body.mealType.toLowerCase();
    var dishtype = req.body.dishType.toLowerCase();
    var ingredients = [];

    if ("ingredients" in req.body) {
        ingredients = req.body.ingredients;
    }

    //Calculate daily nutrition needed
    nutrineed = caldailynut(age, height, weight, gender, postworkout, diet);

    //Sub sql_query

    //Ingredient
    var str_ingredient = "";
    if (ingredients.length != 0) {
        str_ingredient = query_ingredient(ingredients);
    }

    //Meal type
    var str_mealtype = query_mealtype(mealtype);

    //Time
    var str_time = query_time(time);

    //Region
    var str_region = "";
    if (region != "any") {
        str_region = query_region(region);
    }

    //Dish type
    var str_dishtype = query_dishtype(dishtype);

    //Vegetarian
    var str_vegetarian = "";
    if (vegetarian == true) {
        str_vegetarian = query_vegetarian();
    }

    //Form sql_query
    var sql_query = str_mealtype + " intersect " + str_time;
    if (str_ingredient != "") {
        sql_query += " intersect " + str_ingredient;
    }
    if (str_region != "") {
        sql_query += " intersect " + str_region;
    }
    sql_query += " intersect " + str_dishtype;
    if (vegetarian != "") {
        sql_query += " intersect " + str_vegetarian;
    }
    sql_query = "select * from (" + sql_query + ") as st inner join (select reci_id, name, minutes, n_step, n_ingredient, calorie, protein, totalcarbon, totalfat from recipe)as nt using(reci_id)";

    //Order sql_query
    if (dishtype == "appetizer" || mealtype == "snack" || dishtype == "any") {
        sql_query = sql_query + " order by rand()";
    }
    else {
        if (mealtype == "breakfast" || mealtype == "lunch") {
            nul_factor = 0.3;
        }
        else if (mealtype == "dinner") {
            if (dishtype == "main dish") {
                nul_factor = 0.4;
            }
            else if (dishtype == "side dish") {
                nul_factor = 0.2;
            }
        }
        calories_suggested = (nutrineed.calorie * nul_factor).toFixed(2);
        protein_suggested = (nutrineed.protein * nul_factor).toFixed(2);
        fat_suggested = (nutrineed.fat * nul_factor).toFixed(2);
        sql_query = sql_query +
            ` order by (abs(calorie-${calories_suggested})/${calories_suggested} + abs(protein - ${protein_suggested})/${protein_suggested}+ abs(totalfat - ${fat_suggested})/${fat_suggested}) asc`;
    }
    sql_query = sql_query + " limit 10";

    console.log(sql_query);

    db.query(sql_query)
    .then(result=>{
        res.status(200).json(result[0]);
        console.log(result[0])
    });

});




module.exports = router;
