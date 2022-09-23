var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb');
var mongoose = require('mongoose');
const dotenv = require('dotenv')


//load config
dotenv.config({ path: './config/db.env' })


mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
//Check connection
db.once('open', function() {
    console.log('Connected to MongoDB');
});

//Check For DB errors
db.on('error', function(err) {
    console.log(err)
});



var routes = require('./routes/index');
var admin = require('./routes/admin');

// Init App
var app = express();




//View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({ defaultLayout: 'normal' }));
app.set('view engine', 'handlebars');



//BodyParser MiddleWare
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser);

//Express bodyparser
app.use(express.urlencoded({ extended: true }));

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));


//Passport init
app.use(passport.initialize());
app.use(passport.session());




//Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

//Connect Flash
app.use(flash());

//Global vars
app.use(function(req, res, next) {
    res.locals.success_messages = req.flash('success_msg');
    res.locals.error_messages = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use('/', routes);
app.use('/admin', require('./routes/admin'));

//Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
    console.log('Server started on port ' + app.get('port'));
})