const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const { promisify } = require('util')


exports.registrar_pagos = async (req, res) =>{
    try {
        let = indiceEstado =2 ;
        const id_cli = req.body.id_cli;
     
        const fecha_venc = req.body.fecha_vencimiento;
        const fecha_abono = req.body.fecha_abono;
        const id_contrato = req.body.id_contrato;
        let est_cliente = req.body.estado_cli;
        let diferencia_dias =req.body.dias_diferencia
        let prorroga =req.body.tiene_prorroga
        
        const deuda = 0;
        console.log(est_cliente);
        
        

        conexion.query("UPDATE cliente SET id_estado=? WHERE id_cliente = ?", [est_cliente, id_cli], (error, results) => {
            if (error) {
                throw error;
            } else {
                conexion.query('INSERT INTO pago SET ?', {
                    fec_abono: fecha_abono, dias_atraso:diferencia_dias, prorroga:prorroga,  id_cliente: id_cli, id_contrato:id_contrato, cliente_deuda: deuda,
                 }, (error, results) => {
                    if (error) { console.log(error) }
                    res.redirect('/');
        
                    console.log('Pago Registrado');
                });
                }

                });

     
      
     

        
    } catch (error) {
        console.log(error);
    }
}


//Procedimiento para registrarse
exports.register_user = async (req, res) => {

    try {
        const nombre = req.body.name;
        const apellido = req.body.apellido;
       
        const documento = req.body.documento;
        const perfil = req.body.perfil;
        const estado = req.body.estado
        const contraseña = req.body.contraseña;

        let passHash = await bcryptjs.hash(contraseña, 8)
        //Conexion y sentencia para insertar datos
        conexion.query('INSERT INTO usuario SET ?', {
            nombres: nombre, apellidos: apellido, num_doc:documento, estado: estado, id_perfil: perfil, contraseña: contraseña
         }, (error, results) => {
            if (error) { console.log(error) }
            res.redirect('/list_users');

            console.log('usuario creado');
        });

        
    } catch (error) {
        console.log(error);
    }

}

/*
//Procedimiento para registrarse
exports.register_user = async (req, res) => {

    try {
        const nombre = req.body.name;
        const apellido = req.body.apellido;
        const tipo_document = req.body.tipodocumento;
        const documento = req.body.documento;
        const perfil = req.body.perfil;
        const estado = req.body.estado
        const contraseña = req.body.contraseña;

        let passHash = await bcryptjs.hash(contraseña, 8)
        //Conexion y sentencia para insertar datos
        conexion.query('INSERT INTO tb_clientes SET ?', {
            nombre_cli: nombre, cobro_cantidad: cobro,
            fecha_vencimiento: fechav, fecha_vencimiento_num: fechan, estado_cliente: estado, contraseña_cli: passHash
        }, (error, results) => {
            if (error) { console.log(error) }
            res.redirect('/');
        });
    } catch (error) {
        console.log(error);
    }

}
*/


//Exporta el login y realiza la funcion d inicio de sesion y validacion
exports.login = async (req, res) => {
    try {
        const user = req.body.user
        const pass = req.body.contraseña
        console.log(user + " - " + pass)

        if (!user || !pass) {
            res.render('login', {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese Usuario y contraseña",
                alertIcon: 'info',
                showConfirmButton: true,
                timer: 3000,
                ruta: 'login'
            })
        } else {
            conexion.query('SELECT * FROM usuario WHERE nombres=? and contraseña=?', [user,pass], async (error, results) => {
                if (results.length == 0 ) {
                    res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o contraseña incorrecta",
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: 2000,
                        ruta: 'login'
                    })
                } else {
                    //Inicio de sesion
                    const id = results[0].id_usuario;
                    const token = jwt.sign({ id_usuario: id }, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })

                    //generamos token sin fecha de expiracion
                    //  const token = jwt.sign({id:id}, process.env.JWT_SECRETO      --solo con esta linea

                    console.log('TOKEN: ' + token + "para el usuario : " + user);

                    const cookiesOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookiesOptions)
                    res.render('login', {
                        alert: true,
                        alertTitle: "Conexion Exitosa",
                        alertMessage: "Login Correcto",
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 2000,
                        ruta: ''
                    })

                    console.log('Ingrensando..INGRESO')
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}

//Comprobar si el usuario esta logeado y autenticado

exports.isAuthenticated = async (req, res,next)=>{
    if(req.cookies.jwt){
      
        try{
            const decodificado = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO);
            conexion.query('SELECT * FROM usuario WHERE  id_usuario= ?' , [decodificado.id_usuario] , (error, results)=>{
                //Condicional si el resultado no tiene ningun valor...
                if(!results){return next()}
                req.user= results[0];
               
                return next();

            })
        }catch(error){
            console.log(error);
           
            return next();
        }
    }else{
        //Si no esta autenticado lo manda al login
     
        res.redirect('/login')
       
    }
   
}




exports.logout = (req, res)=>{
    res.clearCookie('jwt')   
    console.log('pal lobby')
    return res.redirect('/login')
}