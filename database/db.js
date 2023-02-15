const mysql =  require('mysql');

const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
    
/*
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cliente_db' */
});

conexion.connect((error)=>{
    if(error){
        console.error('el error de la conexion es '+error);
        return
    
    }
    console.log('!Conectado a la base de datos de Mysql');
})

module.exports = conexion;