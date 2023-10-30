const tabla = 'usuarios';
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
        const usuario ={
            id_usuario: body.id_usuario,
            rol: body.rol,
            nombre: body.nombre,
            identificador: body.identificador,
            fecha_nacimiento: body.fecha_nacimiento,
            sexo: body.sexo,
            direccion: body.direccion,
            telefono: body.telefono,
            estado_civil: body.estado_civil,
            correo: body.correo,
            activo: body.activo,

        }

        const respuesta = await db.agregar(tabla, usuario);
        console.log(respuesta);
        var insertId = 0;
        if(body.id_usuario == 0){
            insertId = respuesta.insertId;
        }else{
            insertId = body.id_usuario;
        }
        const respuesta2 = '';
        if(body.id_usuario || body.password ){
          respuesa2 =  await auth.agregar({
                id_usuario: insertId,
                username: body.username,
                password: body.password,
                token: body.token
            })
        }
        return respuesta2;
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