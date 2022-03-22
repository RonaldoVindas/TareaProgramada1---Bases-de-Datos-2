const { Router } = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const router = Router();
const express = require('express');
const { JSONCookie } = require('cookie-parser');
const PassportLocal = require('passport-local').Strategy;
const imageToBlob = require( 'image-to-blob' );
const multer = require('multer');
const { path } = require('express/lib/application');
const { default: mongoose } = require('mongoose');


const mysqldb = require('../ConexionServidoresBasesDatos/MySQL/MysqlConnect');
const mongodb = require('../ConexionServidoresBasesDatos/MongoDb/MongodbConnect');
const neo4jdb = require('../ConexionServidoresBasesDatos/Neo4J/Neo4jConnect');

var userEmail;
var userPassword;


const upload = multer({storage: multer.memoryStorage()});
/*
router.use(express.urlencoded({extended: true}));

router.use(cookieParser('secret'));

router.use(cookieParser({
    secret: 'secret',
    resave: true,
    saveUnitialized: true

}))

router.use(passport.initialize());
router.use(passport.session());
/*passport.use(new PassportLocal( 
        function (username, password, done){
            if(username == mysqldb.ExistsUserEmail(username) && password == mysqldb.)
        }
))*/


////////////////////


router.get('/', (req, res)=> {
    res.render('Home');

});


router.get('/login', (req, res)=> {
    res.render('Login');


});

router.post('/login', (req, res)=> {
    console.log(req.body);
    res.redirect('/Home');
});



router.get('/register', (req, res)=> {
    res.render('Register');

});


router.post('/register', (req, res)=> {
   /* mysqldb.InsertUser(req.body.RegisterEmail, req.body.RegisterName, req.body.RegisterLastName, req.body.RegisterPassword, 
                       req.body.RegisterGDescription, req.body.RegisterBirthDay, req.body.RegisterPhoto);
   */
   /* res.redirect('/Home');*/
});



router.get('/newpost', (req, res)=> {
    res.render('Newpost');

});

router.post('/newpost', (req, res)=> {
    mongodb.InsertPost('andrey192006@hotmail', ('/IMGFolder/'+ req.file.filename) || ('"') ,req.body.description,'1')
});



router.get('/Home',  async(req, res)=> {
    const images =  await mongodb.ShowPostSenderEmail('andrey192006@hotmail'); 
    console.log(images)
    res.render('Home', { images: images });

});



router.get('/profile/', (req, res)=> {
    res.send('luego del login');

});
router.get('/editprofile/', (req, res)=> {
    res.send('luego del login');

});
router.get('/search-user/', (req, res)=> {
    res.send('luego del login');

});

router.get('/friend-list/', (req, res)=> {
    res.send('luego del login');

});

router.get('/friend-request/', (req, res)=> {
    res.send('luego del login');

});


module.exports = router;