const tabla = 'cuenta_bancaria';
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

    function todos_idUsuario(id){
        return db.todos_idUsuario(tabla, id);
    }
    
    function uno_cuentaBancaria(id){
        return db.uno_cuentaBancaria(tabla, id);
    }
    
   async function agregar(body){
       const cuenta ={
           cuenta_bancaria: 0,
           id_usuario: body.id_usuario,
           tipo: body.tipo,
           balance: body.balance,
        }

        if(cuenta.id_usuario == 0){
            return error();
         }

        const respuesta = await db.agregarCuenta(tabla, cuenta);
        console.log(respuesta);
        return respuesta;
    }
    async function eliminar(body){
        const respuesta = await db.eliminarCuenta(tabla, body);
        console.log(respuesta);
        return 
    }

    function actualizar(body){
        return db.actualizarCuenta(tabla, body);
    }


    return{
    todos,
    uno_cuentaBancaria,
    agregar,
    todos_idUsuario,
    eliminar,
    actualizar
    }
}