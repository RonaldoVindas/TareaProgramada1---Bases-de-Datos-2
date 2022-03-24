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



router.get('/', (req, res)=> {
    res.render('Home');

});


router.get('/login', (req, res)=> {
    res.render('Login');


});

router.post('/login', passport.authenticate('local',{
    
    successRedirect: "/Home",

    failureRedirect:  "/register"
}));



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
    try{
        mongodb.InsertPost('RONY@hotmail', ('/IMGFolder/'+ req.file.filename) || ('"') ,req.body.description,'1')
        
    }catch{mongodb.InsertPost('RONY@hotmail', '' ,req.body.description,'1')};
    res.redirect('/Home');
});



router.get('/Home',  async(req, res)=> {
    const images =  await mongodb.ShowPostData(); 
    res.render('Home', { images: images });

});

router.get('/myechos',  async(req, res)=> {
    const images =  await mongodb.ShowPostSenderEmail('andrey192006@hotmail'); 
    res.render('myechos', { images: images });

});


router.get('/editechos/:id', async(req, res)=> {
    const { id } = req.params;
   const image = await mongodb.ShowPostID(id);
   res.render('editechos', { image: image } );
    

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