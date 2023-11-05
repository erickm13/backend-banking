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
    
    function uno(id){
        return db.uno(tabla, id);
    }
    
   async function agregar(body){
        const cuenta ={
            cuenta_bancaria: 0,
            id_usuario: body.id_usuario,
            balance: body.balance,
        }

        if(body.id_usuario == 0){
            return error("El usuario no esta registrado", 401);
        }
        const respuesta = await db.agregarCuenta(tabla, cuenta);
        console.log(respuesta);
        return respuesta;
    }
    function eliminar(body){
        return db.eliminar(tabla, body);
    }
    return{
    todos,
    uno,
    agregar,
    eliminar
    }
}