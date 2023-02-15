const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

//Establecemos el motor de plantillas
app.set('view engine' , 'ejs');
//Seteamos urlencoded para capturar los datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

    

// Invocamos a dotenv
const dotenv = require('dotenv').config({path:'./env/.env'})
//const dotenv = require('dotenv');
//dotenv.config({path:'./env/env'});

// Acceder a la carpeta public
app.use('/resources',express.static('public'));
app.use('/resources',express.static(__dirname+ '/public'));

//Invocamos a bcryptjs
const bcryptjs = require('bcryptjs');

//Var .Session
const session = require('express-session');
const { Cookie } = require('express-session');
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized:true
}));


app.use(cookieParser());
//LLamar al router
app.use('/' , require('./router'));

//LLamar al login
app.get('/login' , (req,res)=>{
    res.render('login',{alert:false});
})


//´Para eliminar el cache y que no se pueda volver con el boton de back luego de hacer logout
app.use(function(req,res,next){
    if(!req.user)
        res.header('Cache-Control' , 'private , no-cache , no-store , must-revalidate');
        next(); 
})


//Se llama al puerto que se va a utilizar
app.listen(3000, ()=>{
    console.log('Server corriendo en http://localhost:3000');
});


