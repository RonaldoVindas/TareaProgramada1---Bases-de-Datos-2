const mongodb = require('./ConexionServidoresBasesDatos/MongoDb/MongodbConnect.js');

const mysqldb = require('./ConexionServidoresBasesDatos/MySQL/MysqlConnect.js');

const neo4jdb = require('./ConexionServidoresBasesDatos/MySQL/MysqlConnect');





const express = require('express');
const path =require('path');
const morgan = require('morgan');
const multer = require('multer');
const uuid = require('uuid');
const { format } = require('timeago.js');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const PassportLocal = require('passport-local').Strategy;


// Initializations
const app = express();
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true

}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new PassportLocal(function(username,password,done) {
    if(username == "andrey192006@hotmail" && password =="654321")
    return (null,{ email: "andrey192006@hotmail" , name: "alvaro"});

    done(null,false);
}));

passport.serializeUser(function(user,done){
    done(null,user.email);

});

passport.deserializeUser(function(email,done){
    done(null,{email: "andrey192006@hotmail" , name: "alvaro"})

});



//Settings

app.set('Front-end', path.join(__dirname, 'Front-end'));
app.set('view engine', 'ejs');
app.set('port', process.env.port || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));



const storage = multer.diskStorage({
    destination: path.join(__dirname,'IMGFolder'),
    filename:(rew, file, cb, filename)=>{
        cb(null, uuid.v4() + path.extname(file.originalname));
    }
});

app.use(multer({
    storage: storage
}).single('image'));

// GLobal variables



app.set('Front-end', path.join(__dirname, 'Front-end'));
app.set('view engine', 'ejs');
app.set('port', process.env.port || 3000);


// GLobal variables

app.use((req, res, next) => {
    app.locals.format  = format;
    next();
});



//Routes
app.use(require('./Back-End/index'));
// static files

app.use(express.static(__dirname));


//start server
const port = 3000


app.listen(app.get('port'), () => {
    console.log('Server on port '+app.get('port'));
});