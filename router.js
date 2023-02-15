const express = require('express');
const router = express.Router();
const moment = require('moment');

const Swal = require("sweetalert2");

const conexion = require('./database/db');

const authController = require('./controllers/authController');
let message = "";


//Funcion para mostrar los datos llamando al index.ejs
router.get('/', authController.isAuthenticated , (req, res) => {
    conexion.query('SELECT cliente.id_cliente, cliente.nombres , cliente.apellidos, cliente.num_doc , cliente.celular  , cliente.id_estado, estado.nombre , contrato.dia_pago , contrato.ip , contrato.costo_servicio, pago.dias_atraso, pago.cliente_deuda, pago.dias_gracia, pago.prorroga FROM cliente LEFT JOIN contrato ON cliente.id_cliente = contrato.id_cliente LEFT JOIN pago ON cliente.id_cliente = pago.id_cliente LEFT JOIN estado ON cliente.id_estado = estado.id_estado where cliente.id_estado !=4', (error, results) => {
 


        if (error) {
            throw error;
        } else {



            res.render('index', { results: results   /*, user:req.user */ });


            //        console.log(results);

        }
    });
})


router.get('/list_users', authController.isAuthenticated , (req, res) => {
    conexion.query("SELECT usuario.id_usuario, usuario.nombres , usuario.apellidos , usuario.num_doc , usuario.contraseña , CASE usuario.estado WHEN 1 THEN 'Activo' WHEN 2 THEN 'Inactivo' ELSE 'Indefinido' END as estado , usuario.id_perfil, perfil.nombre FROM usuario JOIN perfil ON usuario.id_perfil = perfil.id_perfil where usuario.estado=1", (error, results) => {
        if (error) {
            throw error;
        } else {


            res.render('list_users', { results: results });
            //   res.render('list_users', { results: results, user:req.user  });
        }
    });
});










//Ruta para crear 
router.get('/create_client' ,(req, res) => {
    conexion.query('SELECT * FROM tipo_documento', (error, results1) => {
        if (error) {
            throw error;
        } else {


            conexion.query('SELECT * FROM estado', (error, results2) => {
                if (error) {
                    throw error;
                } else {
                    res.render('create_client', { tip_doc: results1, estado: results2 });
                }
            })



        }
    })

})








router.get('/contrato_cliente' , authController.isAuthenticated , (req, res) => {
    res.render('contrato_cliente');
})

const estados1 = {

    1: 'Activo',
    2: 'Inactivo'
};

router.get('/create_user', authController.isAuthenticated , (req, res) => {
    conexion.query("SELECT * FROM perfil", (error, results) => {
        if (error) {
            throw error;
        } else {
            var datos = results;
            conexion.query("SELECT * FROM usuario", (error, resultados) => {
                if (error) {
                    throw error;
                } else {
                    var datosusuario = resultados;
                    res.render('create_user', { perfil: datos, estados: estados1, user: datosusuario });
                }
            });
        }
    });
})

/*router.get('/list_users', (req, res) => {
    res.render('list_users');
})*/

router.get('/login', (req, res) => {
    res.render('login', { alert: false });
})

//Codigo necesario para que aparesca el Login eje
/*router.get('/login', (req, res)=>{
    res.render('login', {alert:false});
});*/




router.get('/delete_user/:id', (req, res) => {
    const id = req.params.id;
    conexion.query("UPDATE usuario SET estado=? WHERE id_usuario = ? ", [2, id], (error, results) => {
        if (error) {
            throw error;
        } else {

            res.redirect('/list_users')
        }
    })
})

const estados = {       

    1: 'Activo',
    2: 'Inactivo'
};

router.get('/edit_user/:id'  ,  authController.isAuthenticated , (req, res) => {
    const id = req.params.id;
    conexion.query('SELECT * FROM usuario WHERE id_usuario=?', [id], (error, results) => {
        if (error) {
            throw error;
        } else {

            conexion.query('SELECT * FROM perfil', (error, results1) => {
                if (error) {
                    throw error;
                } else {
                    res.render('edit_users', { user: results[0], estados: estados, perfil: results1 });
                }
            });


            //      res.render('edit_users', { user: results[0], estados: estados });

        }
    })
})

/*
let checkboxValue = false;

router.get('/ruta-get', (req, res) => {
     checkboxValue = req.query.checkboxValue;

      res.send({ checkboxValue: checkboxValue });
      console.log(checkboxValue);
  
  });
  */
  let checkboxValue ;
router.get('/formato_pago1/:id' , authController.isAuthenticated , (req, res) => {

    const idCliente = req.query.idCliente;
    checkboxValue = req.query.checkbox;
    const id = req.params.id;
    
    let resultadoSinProrroga;
    let resultadoConProrroga;
    let diferenciaEnDias;
    let deuda_cliente;
    let fechaHoyComprobar = moment().format("YYYY-MM-DD");
    let Fechatoday = moment();
    let diaVecimiento = 0;
    let mesVecimiento = 0;
    let añoVecimiento = 0;
    mesVecimiento = Fechatoday.format("M");
    mesVecimiento = parseInt(mesVecimiento) - 1;
    añoVecimiento = Fechatoday.format("YYYY");
    let fechaVencimiento;

    const fechaDeHoy = moment();
    conexion.query('SELECT contrato.id_contrato , contrato.id_servicio , contrato.costo_servicio,  contrato.dia_pago , pago.fec_abono, cliente.nombres, cliente.apellidos , cliente.id_estado , cliente.id_cliente from contrato left JOIN cliente ON cliente.id_cliente = contrato.id_cliente left JOIN pago ON contrato.id_cliente = pago.id_cliente where cliente.id_cliente=?', [id], (error, results) => {
        if (error) {
            throw error;
        } else {
     diaVecimiento = results[0].dia_pago;
     fechaVencimiento = moment([añoVecimiento, mesVecimiento, diaVecimiento]);
     let fechaNPR_sin_format = fechaVencimiento.clone();
     let fechaCPR_sin_format = fechaVencimiento.add(2, 'days');

    let fechaSinProrrogaFormato = fechaNPR_sin_format.clone();
    fechaSinProrrogaFormato = fechaSinProrrogaFormato.format("YYYY-MM-DD");

     let fechVencProrrogaFormato =  fechaCPR_sin_format.format("YYYY-MM-DD");

     if(checkboxValue=='true'){

        if (fechVencProrrogaFormato >= fechaHoyComprobar) {
            
            deuda_cliente = 0;
            estado_cliente = 2;
          
           
        } else {
            deuda_cliente = 10;
            estado_cliente = 3;
           
        }        

        diferenciaEnDias =  moment(fechaCPR_sin_format).startOf('day').diff(moment().startOf('day'), "days");


     }else{

        if (fechaSinProrrogaFormato >= fechaHoyComprobar) {
            deuda_cliente = 0;
            estado_cliente = 2;
                     
        } else {
            deuda_cliente = 10;
            estado_cliente = 3;
           
        }        
        diferenciaEnDias =  moment(fechaNPR_sin_format).startOf('day').diff(moment().startOf('day'), "days");

        
     }

     if (diferenciaEnDias < 0) {

        resultadoSinProrroga = "La fecha vencio hace " + Math.abs(diferenciaEnDias) + " días";
            } else {
                resultadoSinProrroga = "Faltan " + diferenciaEnDias + " días para la fecha límite";
            }

     

     res.render('formato_pago', { resultados: results[0], fechaSinProrrogaFormato, fechaHoyComprobar,estado_cliente , diferenciaEnDias ,resultadoSinProrroga, deuda_cliente,checkboxValue });

            console.log(deuda_cliente);
        }
    })
})


//RUTA PARA EDITAR REGISTROS
router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('SELECT * FROM cliente WHERE id_cliente=?', [id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('edit', { user: results[0] });

        }
    })
})


//RUTA PARA ELIMINAR REGISTROS
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    conexion.query("UPDATE cliente SET id_estado = ? WHERE id_cliente = ? ", [4, id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.redirect('/')
        }
    })
})


router.get('/pagorealizadorepetido/:id',  (req, res) => {

    const id = req.params.id;
    let pagoComprobado = false;
    conexion.query("SELECT * FROM pago WHERE id_cliente = ? AND MONTH(fec_abono) = MONTH(NOW())", [id], (error, datosComparar) => {

        if (error) {
            throw error;
        } else {
         
            if (datosComparar.length === 0) {

                res.json({pagoComprobado});
        
            } else {
            
                pagoComprobado = true;
                console.log("El cliente ya pago");
               
                res.json({pagoComprobado});
            }

        }
    });
})



//Funcion para comprobar si el pago se hizo puntual o con retraso
router.get('/pagorealizado/:id', (req, res) => {
    const id = req.params.id;
    let diferenciaEnDias ;
    let dateToday = moment();
    let diaDeHoy = dateToday.format("YYYY-MM-DD");
    let fechaDePagoCliente;
    let  diaFechaFinal;
    let añoFechaFinal;
    let mesFechaFinal;
    let today = 0 ;
    let fechaFormateadaCliente ;

     today = moment();
     mesFechaFinal = today.format("M");
     añoFechaFinal = today.format("YYYY");
    mesFechaFinal = parseInt(mesFechaFinal) - 1;
   
    let fechaConProrrogaFormateada;
let fechaDePagoClienteSinProrroga;

    conexion.query('SELECT contrato.id_contrato ,contrato.dia_pago , pago.fec_abono,  cliente.id_estado , cliente.id_cliente from contrato left JOIN cliente ON cliente.id_cliente = contrato.id_cliente left JOIN pago ON contrato.id_cliente = pago.id_cliente where cliente.id_cliente=?', [id], (error, results1) => {
        if (error) {
            throw error;
        } else {
            let = indiceEstado = 0;

             diaFechaFinal = results1[0].dia_pago;
             fechaDePagoCliente = moment([añoFechaFinal, mesFechaFinal, diaFechaFinal]);

            
             fechaDePagoClienteSinProrroga = fechaDePagoCliente.clone();

             fechaFormateadaCliente = fechaDePagoCliente.format("YYYY-MM-DD");

            let fechaHoyComprobar = moment().format("YYYY-MM-DD");

           
          
          
          //  let diferenciaEnDias1 = fechaDePagoCliente.diff(moment(), "hours");

            let fechaConProrroga = fechaDePagoCliente.add(2, 'days');

             fechaConProrrogaFormateada = fechaConProrroga.format("YYYY-MM-DD");


           
 

           // console.log(fechaHoyComprobar);

                if(checkboxValue == 'true'){

                    if (fechaConProrrogaFormateada >= fechaHoyComprobar) {
                        indiceEstado = 2;
                       
                    } else {
                        indiceEstado = 3;
                       
                    }

                    console.log("pago con checkbox prorroga");
                    diferenciaEnDias =  moment(fechaConProrroga).startOf('day').diff(moment().startOf('day'), "days");
                   
                    console.log(diferenciaEnDias);
                }else{
                   
                
                    if (fechaFormateadaCliente >= fechaHoyComprobar) {
                        indiceEstado = 2;
                       
                    } else {
                        indiceEstado = 3;
                      
                    } 
                    diferenciaEnDias = moment(fechaDePagoClienteSinProrroga).startOf('day').diff(moment().startOf('day'), "days");  
                    console.log("pago sin checkbox prorroga");
                    console.log(diferenciaEnDias);
                  
                }
          
           
       
            conexion.query("SELECT * FROM pago WHERE id_cliente = ? AND MONTH(fec_abono) = MONTH(NOW())", [id], (error, datosComparar) => {
                if (error) {
                    throw error;
                } else {
                    console.log(datosComparar);
                    if (datosComparar.length === 0) {
                        conexion.query("UPDATE cliente SET id_estado=? WHERE id_cliente = ?", [indiceEstado, id], (error, results2) => {
                            if (error) {
                                throw error;
                            } else {
                                conexion.query('INSERT INTO pago SET ?', {
                                    fec_abono: diaDeHoy, dias_atraso: diferenciaEnDias, id_cliente: id, id_contrato: results1[0].id_contrato
                                }, (error, results3) => {
                                    if (error) { console.log(error) }
                                  res.redirect('/');
                                  checkboxValue = false;
                            
                                });
                            }
                        });

                    } else {
                      
                        console.log("el cliente ya pago este mes");
                    }

                }
            });

        }
    })
});




 
 
//Reinicia el estado de pago de los usuarios;
router.get('/guardarEstadoPagos', (req, res) => {

    conexion.query(
        'INSERT INTO historial_pagos(id_cliente,id_pago, nombre,apellido,documento, celular, dia_pago , cantidad_pago,deuda, fecha_pago, dias_atraso, estado_cli, ip_cliente) '+
         'SELECT cliente.id_cliente, pago.id_pago,  cliente.nombres, cliente.apellidos, cliente.num_doc, cliente.celular, contrato.dia_pago, contrato.costo_servicio, pago.cliente_deuda, pago.fec_abono, pago.dias_atraso, estado.nombre , contrato.ip '+
         'FROM cliente '+
       'LEFT OUTER JOIN contrato ON cliente.id_cliente = contrato.id_cliente '+
       'LEFT OUTER JOIN pago ON cliente.id_cliente = pago.id_cliente '+ 
        //   'LEFT OUTER JOIN historial_pagos ON cliente.id_cliente = historial_pagos.id_cliente '+
       'LEFT OUTER JOIN historial_pagos ON pago.id_pago = historial_pagos.id_pago '+    
       'LEFT OUTER JOIN estado ON cliente.id_estado = estado.id_estado WHERE cliente.id_estado!=4 AND pago.id_pago is not null '+

     'ON DUPLICATE KEY UPDATE ' +
         
    'id_pago = VALUES(id_pago), ' +


    'nombre = VALUES(nombre), ' +
    'apellido = VALUES(apellido), ' +
    'documento = VALUES(documento), ' +
    'celular = VALUES(celular), ' +
    'dia_pago = VALUES(dia_pago), ' +
    'cantidad_pago = VALUES(cantidad_pago), ' +
    'deuda = VALUES(deuda), ' +
    'fecha_pago = VALUES(fecha_pago), ' +
    'dias_atraso = VALUES(dias_atraso), ' +
    'estado_cli = VALUES(estado_cli), ' +
    'ip_cliente = VALUES(ip_cliente) ' 
        
         
          ,(error, results) => {
        if (error) {
            throw error;
        } else {
           


            console.log(results)
            console.log('Guardado con exito');
            res.redirect('/');
          

        }
    })
 
});


//Reinicia el estado de pago de los usuarios;
router.get('/updateEstadoMes', (req, res) => {
    conexion.query('UPDATE cliente  SET id_estado = 1 WHERE id_estado != 4; ', (error, results) => {
  
    
           
        if (error) {

            
            throw error;

        } else {    

            conexion.query('DELETE FROM pago ; ', (error, results)=>{

                if (error) {

            
                    throw error;
        
                } else {

                    res.redirect('/');

                }

            });


    

        }
    })
 
 
 
});
 
 


//Router para los metodos de control
router.post('/create_user', authController.register_user);
router.post('/registrarPago', authController.registrar_pagos);
//router.post('/create', authController.register);
router.post('/login', authController.login);
router.get('/logout',  authController.logout);

const crud = require('./controllers/crud');
const { query } = require('express');
router.post('/create_client', crud.save_client);

router.post('/contrato_de_cliente', crud.save_contrato);
//router.post('/save', crud.save);
router.post('/update', crud.update);
router.post('/update_user', crud.update_user);
module.exports = router;