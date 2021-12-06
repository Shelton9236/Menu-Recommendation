var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var cors=require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var API_frontpage=require('./routes/get_frontpagerecipes');
var API_singlerecipe=require('./routes/get_singlerecipe');
var API_suggestrecipe=require('./routes/post_userinfo');
var API_test=require('./routes/get_test');
var API_getcomment=require('./routes/get_comments');
var API_postcomment=require('./routes/post_comments');

//User create recipe
var API_postusercreaterecipe=require('./routes/post_newusercreaterecipe');
var API_listusercreaterecipe=require('./routes/get_listusercreaterecipe');
var API_getsingleusercreaterecipe=require('./routes/get_singleusercreaterecipe');

//User favorite recipe
var API_postfavoriterecipe=require('./routes/post_favoriterecipe');
var API_listfavoriterecipe=require('./routes/get_listfavoriterecipe');

//Foodcom recipe
var API_foodcomimage=require('./routes/get_imageurl');

//Shopping list
var API_postshoplist=require('./routes/post_addingrelist');
var API_listshoplist=require('./routes/get_listingrelist');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//app.use(cors);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/public',express.static('public'));

app.use('/api/test',API_test)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/frontpage',API_frontpage);
app.use('/api/singlerecipe',API_singlerecipe);
app.use('/api/suggestrecipe',API_suggestrecipe);
app.use('/api/getcomment',API_getcomment);
app.use('/api/postcomment',API_postcomment);

app.use('/api/usercreate/postrecipe',API_postusercreaterecipe);
app.use('/api/usercreate/listrecipe',API_listusercreaterecipe);
app.use('/api/usercreate/singlerecipe',API_getsingleusercreaterecipe);

app.use('/api/dashboard/postfavorite', API_postfavoriterecipe);
app.use('/api/dashboard/listfavorite', API_listfavoriterecipe);

app.use('/api/foodimageurl', API_foodcomimage);

app.use('/api/addshoplist', API_postshoplist);
app.use('/api/listshoplist', API_listshoplist);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
  console.log(err);
});

module.exports = app;
