var mysql = require('mysql');
const bcrypt = require('bcryptjs');
const { hash } = require('bcrypt');
const documentblobUtil = require('image-to-blob');




var conexion = mysql.createConnection({
    host : 'localhost',
    database : 'po',
    user : 'root',
    password : '2296',
});

conexion.connect(function(err) {
    if (err) {
        console.error('Connection Error: ' + err.stack);
        return;
    }
    console.log('MySQL Successfully Connected with Identifier: ' + conexion.threadId);
});




////////////////////////////////////////////////// CONEXION CON PROCEDIMIENTOS DE MYSQL /////////////////////////////////////////////////////////////////////////


//Tabla: User
function InsertUser(pEmail, pFirstName, pLastname,pPassword,pGeneralDescp, pBirthdate, pPhoto, pVisibility) {
    conexion.query('call Control_InsertUser(?,?,?,?,?,?,?,?)',[pEmail, pFirstName, pLastname,pPassword,pGeneralDescp, pBirthdate, pPhoto, '1111'], function (error, results, fields) {
        if (error)
            throw error;
        console.log('Successful Procedure Transaction');

    });
}



function RemoveUser(pEmail) {
    conexion.query('call Control_RemoveUser(?)', [pEmail], function (error, results, fields) {
        if (error)
            throw error;
        console.log('Successful Procedure Transaction');
        
    });
}



function UpdateUserBirthday(pEmail, pBirthday) {
    conexion.query('call Control_user_Updatebirthday(?,?)', [pEmail, pBirthday], function (error, results, fields) {
        if (error)
            throw error;
        console.log('Successful Procedure Transaction');

         
    });
}


function UpdateUserFirstName(pEmail, pFirstname) {
    conexion.query('call Control_user_Updatefirstname(?,?)', [pEmail, pFirstname], function (error, results, fields) {
        if (error)
            throw error;
        console.log('Successful Procedure Transaction');

         
    });
}


function UpdateUserLastName(pEmail, pLastname) {
    conexion.query('call Control_user_Updatelastname(?,?)', [pEmail, pLastname], function (error, results, fields) {
        if (error)
            throw error;
        console.log('Successful Procedure Transaction');
         
    });
}

function UpdateUserGeneralDescription(pEmail, pDescription) {
    conexion.query('call Control_user_Updategeneraldescription(?,?)', [pEmail, pDescription], function (error, results, fields) {
        if (error)
            throw error;
        console.log('Successful Procedure Transaction');
         
    });
}

function UpdateUserPassword(pEmail, pPassword) {
    conexion.query('call Control_user_Updatepassword(?,?)', [pEmail, pPassword], function (error, results, fields) {
        if (error)
            throw error;
        console.log('Successful Procedure Transaction');
         
    });
}

function UpdateUserPhoto(pEmail, pPhoto) {
    conexion.query('call Control_user_Updatephoto(?,?)', [pEmail, pPhoto], function (error, results, fields) {
        if (error)
            throw error;
        console.log('Successful Procedure Transaction');
         
    });
}


function UpdateUserVisibility(pEmail, pVisible) {
    conexion.query('call Control_user_UpdateVisibility(?,?)', [pEmail, pVisible], function (error, results, fields) {
        if (error)
            throw error;
        console.log('Successful Procedure Transaction');
         
    });
}



//Tabla: User 1 IS FRIEND USER 2


function InsertUser1IsFriendUser2(pEmail1, pEmail2) {
    conexion.query('call Control_InsertUser1isfrienduser2(?,?)', [pEmail, pEmail2], function (error, results, fields) {
        if (error)
            throw error;
        console.log('Successful Procedure Transaction');
         
    });
}


function RemoveUser1IsFriendUser2(pEmail1, pEmail2) {
    conexion.query('call Control_RemoveUser1isfrienduser2(?,?)', [pEmail1, pEmail2], function (error, results, fields) {
        if (error)
            throw error;
        console.log('Successful Procedure Transaction');
         
    });
}



//Tabla: User 1 REQUEST User 2


function InsertUser1RequestUser2(pEmail1, pEmail2) {
    conexion.query('call Control_InsertUser1requestuser2(?,?)', [pEmail1, pEmail2], function (error, results, fields) {
        if (error)
            throw error;
        console.log('Successful Procedure Transaction');
    });
}


function RemoveUser1RequestUser2(pEmail1, pEmail2) {
    conexion.query('call Control_RemoveUser1requestuser2(?,?)', [pEmail1, pEmail2], function (error, results, fields) {
        if (error)
            throw error;
        console.log('Successful Procedure Transaction');
    });
}

////////////////////////////////////////////////// CONEXION CON FUNCIONES DE MYSQL /////////////////////////////////////////////////////////////////////////

function GetUserFirstName(pEmail) {
    
    return new Promise((resolve, reject) => {
        conexion.query('SELECT Control_user_Getfirstname(?) as data ', [pEmail],(err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result[0].data);
          
        }
      });
    });
  }

  
function GetUserLastName(pEmail) {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT Control_user_Getlastname(?) as data ', [pEmail],(err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result[0].data);
          
        }
      });
    });
}

function GetUserBirthday(pEmail) {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT Control_user_Getbirthday(?) as data ', [pEmail],(err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result[0].data);
          
        }
      });
    });
}


function GetUserGeneralDescription(pEmail) {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT Control_user_Getgeneraldesdescription(?) as data ', [pEmail],(err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result[0].data);
          
        }
      });
    });
}


function GetUserPassword(pEmail) {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT Control_user_Getpassword(?) as data ', [pEmail],(err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result[0].data);
          
        }
      });
    });
}


function GetUserPhoto(pEmail) {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT Control_user_Getphoto(?) as data ', [pEmail],(err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result[0].data);
          
        }
      });
    });
}


function GetUserVisibility(pEmail) {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT Control_user_Getvisibility(?) as data ', [pEmail],(err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result[0].data);
          
        }
      });
    });
}



function GetIsFriendUser1(pEmail) {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT Control_isfriend_Getuser1email(?) as data ', [pEmail],(err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result[0].data);
          
        }
      });
    });
}


function GetIsFriendUser2(pEmail) {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT Control_isfriend_Getuser2email(?) as data ', [pEmail],(err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result[0].data);
          
        }
      });
    });
}



function GetRequestUser1(pEmail) {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT Control_request_Getuser1email(?) as data ', [pEmail],(err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result[0].data);
          
        }
      });
    });
}


function GetRequestUser2(pEmail) {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT Control_request_Getuser2email(?) as data ', [pEmail],(err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result[0].data);
          
        }
      });
    });
}

function ExistsUserEmail(pEmail) {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT ExistsEmailInDatabase(?) as data ', [pEmail],(err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result[0].data);
          
        }
      });
    });
}


function EncryptString(pEmail) {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT EncryptString(?) as data ', [pEmail],(err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result[0].data);
          
        }
      });
    });
}



function getUsersPostInfo(pEmail) {
  return new Promise((resolve, reject) => {
      conexion.query('SELECT first_name, last_name, photo FROM po.user Where email = ?', [pEmail],(err, result) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(result[0]);
        
      }
    });
  });
}






module.exports = {GetIsFriendUser1, GetIsFriendUser2,GetRequestUser1,GetRequestUser2, GetUserBirthday, GetUserFirstName, GetUserFirstName, GetUserGeneralDescription, GetUserLastName, GetUserPassword, GetUserPhoto,
GetUserPhoto, GetUserVisibility, InsertUser, InsertUser1IsFriendUser2, InsertUser1RequestUser2, RemoveUser, RemoveUser1IsFriendUser2, RemoveUser1RequestUser2,UpdateUserBirthday, UpdateUserFirstName, UpdateUserGeneralDescription,
UpdateUserLastName, UpdateUserPassword, UpdateUserPhoto, UpdateUserVisibility, ExistsUserEmail,EncryptString,getUsersPostInfo};


/*Probablemente necesite otra función para ecriptar strings y poder compararlos con las contraseñas encriptadas para el login*/

////////////////TEST

//InsertUser(pEmail, pFirstName, pLastname,pPassword,pGeneralDescp, pBirthdate, pPhoto, pVisibility) 
//InsertUser('Maradona@gmail.com', 'Diego','Maradona', 'CocaCola','Hago goles por comida', '1960-05-05', null, '11101110');


/*
const testeo = GetUserFirstName('Maradona@gmail.com');
console.log(testeo);


*/
///////////////////////////// NOTAS EXTRA ////////////////////////////////////////////////////////

/*


// cifra la contraseña
UserSchema.methods.encryptPassword = async (password) => {
    const salt =  await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
  };


//Metodo que encripta la contraseña puesta por el usuario al hacer signin y la compara con la encriptacion en la base de datos 
  UserSchema.methods.matchPassword = async function (password) {
    const isPassword = await bcrypt.compare(password, this.password);
    console.log(isPassword);
    return isPassword;
  };
*/


/*
setTimeout(async function () {
  console.log( await GetRequestUser2('andrey192006@hotmail'))
}, 1000);*/
