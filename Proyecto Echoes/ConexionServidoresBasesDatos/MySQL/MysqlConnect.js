var mysql = require('mysql');
var conexion= mysql.createConnection({
    host : 'localhost',
    database : 'po',
    user : 'root',
    password : '2296',
});

conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + conexion.threadId);
});




////////////////////////////////////////////////// CONEXION CON PROCEDIMIENTOS DE MYSQL /////////////////////////////////////////////////////////////////////////


//Tabla: User
function InsertUser(pEmail, pFirstName, pLastname,pPassword,pGeneralDescp, pBirthdate, pPhoto, pVisibility) {
    conexion.query('call Control_InsertUser(?,?,?,?,?,?,?,?)',[pEmail, pFirstName, pLastname,pPassword,pGeneralDescp, pBirthdate, pPhoto, pVisibility], function (error, results, fields) {
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
    conexion.query('SELECT Control_user_Getfirstname(?)', [pEmail], function (error, results, fields) {
        if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
    });
}


function GetUserLastName(pEmail) {
    conexion.query('SELECT Control_user_Getlastname(?)', [pEmail], function (error, results, fields) {
        if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
    });
}

function GetUserBirthday(pEmail) {
    conexion.query('SELECT Control_user_Getbirthday(?)', [pEmail], function (error, results, fields) {
        if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
    });
}


function GetUserGeneralDescription(pEmail) {
    conexion.query('SELECT Control_user_Getgeneraldesdescription(?)', [pEmail], function (error, results, fields) {
        if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
    });
}


function GetUserPassword(pEmail) {
    conexion.query('SELECT Control_user_Getpassword(?)', [pEmail], function (error, results, fields) {
        if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
    });
}


function GetUserPhoto(pEmail) {
    conexion.query('SELECT Control_user_Getphoto(?)', [pEmail], function (error, results, fields) {
        if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
    });
}


function GetUserVisibility(pEmail) {
    conexion.query('SELECT Control_user_Getvisibility(?)', [pEmail], function (error, results, fields) {
        if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
    });
}



function GetIsFriendUser1(pEmail) {
    conexion.query('SELECT Control_isfriend_Getuser1email(?)', [pEmail], function (error, results, fields) {
        if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
    });
}


function GetIsFriendUser2(pEmail) {
    conexion.query('SELECT Control_isfriend_Getuser2email(?)', [pEmail], function (error, results, fields) {
        if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
    });
}



function GetRequestUser1(pEmail) {
    conexion.query('SELECT Control_request_Getuser1email(?)', [pEmail], function (error, results, fields) {
        if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
    });
}


function GetRequestUser2(pEmail) {
    conexion.query('SELECT Control_request_Getuser2email(?)', [pEmail], function (error, results, fields) {
        if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
    });
}


/*Probablemente necesite otra función para ecriptar strings y poder compararlos con las contraseñas encriptadas para el login*/

////////////////TEST


InsertUser('Alvaro@gmail.com', 'Alvaro','Moreira', 'NewConker','Como mocos', '1993-12-01', null, '11101110');