const { Router } = require('express');
const router = Router();

const express = require('express');
const imageToBlob = require( 'image-to-blob' );
const multer = require('multer');
const { path } = require('express/lib/application');
const { default: mongoose } = require('mongoose');


const mysqldb = require('../ConexionServidoresBasesDatos/MySQL/MysqlConnect');
const mongodb = require('../ConexionServidoresBasesDatos/MongoDb/MongodbConnect');
const neo4jdb = require('../ConexionServidoresBasesDatos/Neo4J/Neo4jConnect');

const passport = require('passport');

var userEmail;
var userPassword;


const upload = multer({storage: multer.memoryStorage()});



router.get('/',(req,res,next) => {
    if(req.isAuthenticated() ){
        return next();
    }else{
        res.redirect('/login');
    }


}, (req, res)=> {
    res.render('Home');

});


router.get('/login', (req, res)=> {
    res.render('Login');


});

router.post('/login', passport.authenticate('local', {
    
    successRedirect: "/Home",
    failureRedirect:  "/register",
    failureFlash: true
    
    
}));



router.get('/register',(req,res,next) => {
    if(req.isAuthenticated() ){
        res.redirect('/Home');
    }else{
        return next();
    }


}, (req, res)=> {
    res.render('Register');

});


router.post('/register', (req, res)=> {
  

try{
    mysqldb.InsertUser(req.body.RegisterEmail, req.body.RegisterName, req.body.RegisterLastName, req.body.RegisterPassword, 
        req.body.RegisterGDescription, req.body.RegisterBirthDay, ('/IMGFolder/'+ req.file.filename));
                
}catch{mysqldb.InsertUser(req.body.RegisterEmail, req.body.RegisterName, req.body.RegisterLastName, req.body.RegisterPassword, 
    req.body.RegisterGDescription, req.body.RegisterBirthDay, (''));};                 

   
   res.redirect('/login');
});



router.get('/newpost',(req,res,next) => {
    if(req.isAuthenticated() ){
        return next();
    }else{
        res.redirect('/login');
    }


}, (req, res)=> {
    res.render('Newpost');

});

router.post('/newpost', (req, res)=> {
    try{
        mongodb.InsertPost(req.session.passport.user, ('/IMGFolder/'+ req.file.filename) || ('"') ,req.body.description,'1')

    }catch{mongodb.InsertPost(req.session.passport.user, '' ,req.body.description,'1')};
    res.redirect('/Home');
});



router.get('/Home',(req,res,next) => {
    if(req.isAuthenticated() ){

        return next();
    }else{
        res.redirect('/login');
    }


}, async(req, res)=> {
   
    const images =  await mongodb.ShowPostData();
    //console.log(req.user)
    const email = req.session.passport.user
    res.render('Home', { images: images, email: email });

});


router.get('/exit',(req,res) => {
    req.logout();
    res.redirect('/login');
});


router.get('/myechos', (req,res,next) => {
    if(req.isAuthenticated() ){
        return next();
    }else{
        res.redirect('/login');
    }


}, async(req, res)=> {
    const images =  await mongodb.ShowPostSenderEmail(req.session.passport.user); 
    const email = req.session.passport.user
    res.render('myechos', { images: images, email: email });

});


router.get('/editechos/:id',(req,res,next) => {
    if(req.isAuthenticated() ){
        return next();
    }else{
        res.redirect('/login');
    }


}, async(req, res)=> {
   const { id } = req.params;
   const image = await mongodb.ShowPostID(id);
   res.render('editechos', { image: image } );
    

});


router.get('/Profile/:email',(req,res,next) => {
    if(req.isAuthenticated() ){
        return next();
    }else{
        res.redirect('/login');
    }


}, async(req, res)=> {
    const {email} = req.params;

    const firstName = await mysqldb.GetUserFirstName(email);
    const lastName = await mysqldb.GetUserLastName(email);
    const date = await mysqldb.GetUserBirthday(email);

    const date2 = new Date(Date.parse(date));
    const birthDay = date2.toLocaleDateString('en-GB').split('/').reverse().join('-');
    const description = await mysqldb.GetUserGeneralDescription(email);
    const photo = await mysqldb.GetUserPhoto(email);
    const visibility = await mysqldb.GetUserVisibility(email);
    const images =  await mongodb.ShowPostSenderEmail(email); 

   res.render('Profile', { email: email, firstName: firstName, lastName: lastName, birthDay: birthDay, description, photo, visibility, images: images } );



});

router.get('/Profile2/:id',(req,res,next) => {
    if(req.isAuthenticated() ){
        return next();
    }else{
        res.redirect('/login');
    }


}, async(req, res)=> {
    const {id} = req.params;
    const email = await mongodb.GetPostSenderEmail(id);

    const firstName = await mysqldb.GetUserFirstName(email);
    const lastName = await mysqldb.GetUserLastName(email);
    const date = await mysqldb.GetUserBirthday(email);

    const date2 = new Date(Date.parse(date));
    const birthDay = date2.toLocaleDateString('en-GB').split('/').reverse().join('-');
    const description = await mysqldb.GetUserGeneralDescription(email);
    const photo = await mysqldb.GetUserPhoto(email);
    const visibility = await mysqldb.GetUserVisibility(email);
    const images =  await mongodb.ShowPostSenderEmail(email); 

   res.render('Profile2', { email: email, firstName: firstName, lastName: lastName, birthDay: birthDay, description, photo, visibility, images: images } );



});



router.get('/EditProfile/:email',(req,res,next) => {
    if(req.isAuthenticated() ){
        return next();
    }else{
        res.redirect('/login');
    }


}, async(req, res)=> {
    const {email} = req.params;
    const firstName = await mysqldb.GetUserFirstName(email);
    const lastName = await mysqldb.GetUserLastName(email);
    const date = await mysqldb.GetUserBirthday(email);
   
    const date2 = new Date(Date.parse(date));
    const birthDay = date2.toLocaleDateString('en-GB').split('/').reverse().join('-');
    const description = await mysqldb.GetUserGeneralDescription(email);
    const photo = await mysqldb.GetUserPhoto(email);
    const visibility = await mysqldb.GetUserVisibility(email);
    const images =  await mongodb.ShowPostSenderEmail(email); 

   res.render('EditProfile', { email: email, firstName: firstName, lastName: lastName,birthDay: birthDay, description, photo, visibility, images: images } );
});



router.post('/EditProfile/:email', (req, res)=> {
const {email} = req.params;
mysqldb.UpdateUserFirstName(email, req.body.newFirstName);
mysqldb.UpdateUserBirthday(email, req.body.newBirthDay);
mysqldb.UpdateUserLastName(email, req.body.newLastName);
mysqldb.UpdateUserGeneralDescription(email, req.body.newGeneralDescription);

res.redirect('/Home');

});






router.post('/editechos/:id/text', (req, res)=> {
    
    mongodb.UpdatePostDescription(req.body.id, req.body.description)
    res.redirect('/myechos');
   

});
/*

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
*/

module.exports = router;