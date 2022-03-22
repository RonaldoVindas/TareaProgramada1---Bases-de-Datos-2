const mongodb = require('./ConexionServidoresBasesDatos/MongoDb/MongodbConnect.js');

const mysqldb = require('./ConexionServidoresBasesDatos/MySQL/MysqlConnect.js');

const neo4jdb = require('./ConexionServidoresBasesDatos/MySQL/MysqlConnect');



//lo que ocupamos instalar
//npm i ejs fs-extra morgan multer timeago.js uuid

const express = require('express');
const path =require('path');
const morgan = require('morgan');
const multer = require('multer');
const uuid = require('uuid');
const { format } = require('timeago.js');


// Initializations
const app = express();
app.use(express.urlencoded({ extended: false}));

//Settings

app.set('Front-end', path.join(__dirname, 'Front-end'));
app.set('view engine', 'ejs');
app.set('port', process.env.port || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(multer({dest: path.join(__dirname,'IMGFolder')}).single('image'));
const storage = multer.diskStorage({
    destination: path.join(__dirname,'IMGFolder'),
    filename:(rew, file, cb, filename)=>{
        cb(null, uuid.v4()+ path.extname(file.originalname));
    }
});


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