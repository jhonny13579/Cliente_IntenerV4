const conexion = require('../database/db');

const authController = require('./authController');

exports.listar_usuario = (req , res)=>{
    conexion.query("SELECT usuario.id_usuario, usuario.nombres , usuario.apellidos , usuario.num_doc , usuario.contraseña , CASE usuario.estado WHEN 1 THEN 'Activo' WHEN 2 THEN 'Inactivo' ELSE 'Indefinido' END as estado , usuario.id_perfil, perfil.nombre FROM usuario JOIN perfil ON usuario.id_perfil = perfil.id_perfil where usuario.estado=1", (error, results) => {
        if (error) {
            throw error;
        } else {


            res.render('list_users', { results: results/*, user:req.user */ });
        }
    });
}
 
exports.save_client = (req , res)=>{

    const nombre = req.body.name;
    const apellido = req.body.apellido;
    const celular = req.body.celular;
    const tipodoc = req.body.tipodoc;
    const numerodoc = req.body.numerodoc;

    const direccion = req.body.direccion;
    const referencia = req.body.referencia;
    const sector = req.body.sector;
    const estado = req.body.estado;
  
        conexion.query('INSERT INTO cliente SET ?' , {nombres:nombre, apellidos:apellido ,
            celular:celular,id_tipo_doc:tipodoc, num_doc:numerodoc  ,direccion:direccion, direccion:referencia , nom_sector:sector , id_estado:estado} ,(error, results)=>{
               if(error){
                   console.log(error);
               }else{
                   const id = results.insertId;
                  res.render('contrato_cliente',{results:results , id , nombre , estado} );
                //   res.redirect('/');
                    // res.redirect('/contrato_cliente');
                      
               }
            })
       
      
   

}; 




exports.save_contrato = (req, res) =>{
    
    
    const idcliente = req.body.id_cli;
    const fechainicio = req.body.fechaini;
    const fechafinal = req.body.fechafin;
    const diapago = req.body.diapago;
    const serviciocontra = req.body.id_servicio;
    const costoserv = req.body.costoserv;
    const ipdcliente = req.body.ipcliente;
    const observacion = req.body.observac;

    conexion.query('INSERT INTO contrato SET ?' , {fec_inicio:fechainicio, fec_fin:fechafinal ,
        dia_pago:diapago,costo_servicio:costoserv, observaciones:observacion  ,id_servicio:serviciocontra, ip:ipdcliente ,id_cliente:idcliente} ,(error, results)=>{
           if(error){
               console.log(error);
           }else{
               console.log('CLIENTE y COTNTRATO TERRMINADO REGISTRADO HEHE')
               res.redirect('/');
           }
        })
   
}

exports.update = (req, res)=>{


    const id = req.body.id;
 const nombre = req.body.name;
    const apellido = req.body.apellido;
    const celular = req.body.celular;
    const tipodoc = req.body.tipodoc;
    const numerodoc = req.body.numerodoc;

    const direccion = req.body.direccion;
    const sector = req.body.sector;
    const estado = req.body.estado;

    conexion.query('UPDATE cliente SET ? WHERE id_cliente = ?' , [{nombres:nombre, apellidos:apellido ,
        celular:celular,id_tipo_doc:tipodoc, num_doc:numerodoc  ,direccion:direccion, nom_sector:sector , id_estado:estado} , id ], (error, results)=>{
            if(error){
                throw error;
            }else{
                res.redirect('/')
            }
        })

}



exports.update_user = (req, res)=>{
    const id = req.body.id;
    const nombre = req.body.name;
    const apellido = req.body.apellido;
    
    const documento = req.body.documento;
    const perfil = req.body.perfil;
    const estado = req.body.estado
    const contraseña = req.body.contraseña;

    conexion.query('UPDATE usuario SET ? WHERE id_usuario = ?' , [{nombres:nombre, apellidos:apellido ,
        num_doc:documento,id_perfil:perfil, estado:estado , contraseña:contraseña}, id ], (error, results)=>{
            if(error){
                throw error;
            }else{
                res.redirect('/list_users')
                console.log('actualizado user')
            }
        })

}


/*
exports.get('/' ,(req,res)=>{
    const buscarValor = req.body.search;


      conexion.query("SELECT * FROM tb_clientes WHERE nombre_cli LIKE %?",[buscarValor], (error, resultas)=>{
        if(error){
            throw error;
        }else{
            res.render('index',{resultas:resultas});
            console.log('prueba')
        }

      })  ;
     

}); */




