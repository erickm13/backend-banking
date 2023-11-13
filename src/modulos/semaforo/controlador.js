const tabla = 'prestamos';
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
    
    function unoSemaforo(id){
        return db.semaforo(id);
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
            console.log("estooo " + Object.values(id_destinoOrigen));
            const transferenciaPaso1 ={
                cuenta_origen: id_destinoOrigen.id_usuario_origen,
                balance: movimiento.cantidad,
                }
                const transferenciaPaso2 ={
                cuenta_destino: id_destinoOrigen.id_usuario_destino,
                balance: movimiento.cantidad,
                }
                
                const res = await db.transferenciaPaso1(tablaCuenta, transferenciaPaso1);
                console.log("RES 1: " + Object.values(res));
                const res2 = await db.transferenciaPaso2(tablaCuenta, transferenciaPaso2);
                //query transferencia
                console.log("RES 2: " + Object.values(res2));
                return res2;
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
    unoSemaforo,
    agregar,
    eliminar,
    actualizar
    }
}