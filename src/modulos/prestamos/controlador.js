const tabla = 'prestamo';
const error = require('../../middleware/error');
const auth = require('../auth');
module.exports = function(dbInyectada){

    let db = dbInyectada;
    
    if(!db){
        db = require('../../DB/mysql');
    }

    function todos(){
        return db.todos(tabla);
    }
    
    function uno(id){
        return db.uno(tabla, id);
    }
    
   async function agregar(body){

       const prestamo ={
           id_prestamo: 0,
           id_usuario: body.id_usuario,
           cantidad: body.cantidad,
           plazo_meses: body.plazo_meses,
           meses_atrasados: body.meses_atrasados,
           meses_pagados: body.meses_pagados,
           tasa_interes: body.tasa_interes,
           fecha_inicio: body.fecha_inicio,
           fecha_termino: body.fecha_termino,
           estado: 'Solicitado'
        }

        if(prestamo.id_usuario == 0){
            return error();
         }

        const respuesta = await db.agregarPrestamo(tabla, prestamo);
        console.log(respuesta);
        return respuesta;
    }
    async function eliminar(body){
        const respuesta = await db.eliminarPrestamo(tabla, body);
        console.log(respuesta);
        return 
    }

    function actualizar(body){
        return db.actualizarPrestamo(tabla, body);
    }


    return{
    todos,
    uno,
    agregar,
    eliminar,
    actualizar
    }
}