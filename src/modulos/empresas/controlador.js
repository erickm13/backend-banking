const tabla = 'contrato';
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
       const empresa = {
           id_contrato: 0,
           nombre_compania: body.nombre_compania,
           telefono: body.telefono,
           correo: body.correo,
           token : body.token
        }
        const respuesta = await db.agregarEmpresa(tabla, cuenta);
        console.log(respuesta);
        return respuesta;
    }
    async function eliminar(body){
        const respuesta = await db.eliminarEmpresa(tabla, body);
        console.log(respuesta);
        return 
    }


    return{
    todos,
    uno,
    agregar,
    eliminar
    }
}