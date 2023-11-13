const tabla = 'movimiento';
const tablaCuenta = 'cuenta_bancaria';
const e = require('cors');
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
    const origen = 0;
    const destino = 0;
            const movimiento ={
                id_movimiento: 0,
                cuenta_origen: body.cuenta_origen,
                cuenta_destino: body.cuenta_destino,
                cantidad: body.cantidad,
                tipo_movimiento: body.tipo_movimiento,
                fecha: body.fecha,
             }
            if(movimiento.tipo_movimiento == 1){ // transferencia
            //const respuesta = await db.agregarMovimiento(tabla, movimiento);
            preTransfer ={
                cuenta_origen: movimiento.cuenta_origen,
                cuenta_destino: movimiento.cuenta_destino,
            }
            const id_destinoOrigen = await db.datosPreTransferencia(tabla, preTransfer);
            console.log(id_destinoOrigen);
            id_destinoOrigen.forEach(element => {
                this.origen = element.id_usuario_origen;
                this.destino = element.id_usuario_destino;
            });
            const transferencia ={
                cuenta_bancaria: movimiento.cuenta_destino,
                id_usuario: this.destino,
                balance: movimiento.cantidad,
                }
                const res = await db.transferencia(tablaCuenta, transferencia);
                //query transferencia
                console.log(res);
                return res;
             }else if(movimiento.tipo_movimiento == 2){// prestamo
                const respuesta = await db.agregarMovimiento(tabla, movimiento);
                //query prestamos
                console.log(respuesta);
                return respuesta;
            }else if(movimiento.tipo_movimiento == 3){ // deposito
                const respuesta = await db.agregarMovimiento(tabla, movimiento);
                //query Depositos
                console.log(respuesta);
                return respuesta;
            }
            //posiblemente agregar movimiento multas
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
    uno,
    agregar,
    eliminar,
    actualizar
    }
}