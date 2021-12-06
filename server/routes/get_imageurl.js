var express = require('express');
var router = express.Router();
var getimage = require('../modules/foodcomimage');
var {getimgurl} = require('../modules/getimgurl');

router.get('/', async function (req, res) {

    id=req.query.id;

    // getimage(id).then(
    //     result=>{
            
    //         res.status(200).json({'url':result});
    //         console.log(result);
    //     }
    // )
    const url = await getimgurl(id);
    if (url!=null){
        console.log(url);
        res.status(200).json({'url':url});
    }
    else {
        console.log('No image on food.com');
        res.status(200).json({'url':'http://localhost:4000/public/noimage.png'});
    }
    
}
);

module.exports = router;