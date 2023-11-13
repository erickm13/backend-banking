const mysql = require('mysql');
const config = require('../config');
const { reject } = require('bcrypt/promises');

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let conexion;

function connMysql(){
    conexion = mysql.createConnection(dbConfig);
    conexion.connect((err) => {
        if(err){
            console.log('[db error]', err);
            setTimeout(connMysql, 200);
        }else{
            console.log('BS de datos conectada');
        }
    });

    conexion.on('error', (err) => {
        console.log('[db error]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            connMysql();
        }else{
            throw err;
        }
    });

}

connMysql();

// **************** Querys Generales ****************
function todos(tabla){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (err, result) => {
           return err ? reject(err) : resolve(result);
        });
    });
}

function uno(tabla, id){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id_usuario=${id}`, (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}


function eliminar(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id_usuario= ?`, data.id_usuario, (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}

function agregar(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`, [data,data], (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}
// **************** Querys Generales ****************


// **************** Querys Login ****************
function queryLogin(tabla, consulta){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE ?`, consulta, (err, result) => {
            return err ? reject(err) : resolve(result[0]);
        });
    });
}

function getRol(tabla, id){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id_usuario = ?`, id, (err, result) => {
            return err ? reject(err) : resolve(result[0]);
        });
    });
}

// **************** Querys Login ****************


// **************** Querys Cuentas ****************

function uno_cuentaBancaria(tabla, id){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE cuenta_bancaria = ${id} `, (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}

function todos_idUsuario(tabla, id){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id_usuario = ${id} `,  (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}

function agregarCuenta(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, [data,data], (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}

function eliminarCuenta(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE cuenta_bancaria = ? AND id_usuario = ? AND balance = 0;`, [data.cuenta_bancaria, data.id_usuario], (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}

function actualizarCuenta(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla}  SET balance = ? WHERE cuenta_bancaria = ? AND id_usuario = ?`, [data.balance, data.cuenta_bancaria, data.id_usuario], (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}

// **************** Querys Cuentas ****************

// **************** Querys Prestamo ****************

function agregarPrestamo(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, [data,data], (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}

function eliminarPrestamo(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id_prestamo = ? AND id_usuario = ? AND cantidad = 0;`, [data.id_prestamo, data.id_usuario], (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}

function actualizarPrestamo(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla}  SET cantidad = ? WHERE id_prestamo = ? AND id_usuario = ?`, [data.cantidad, data.id_prestamo, data.id_usuario], (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}

function getPrestamo(tabla, id){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id_prestamo = ?`, id, (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}

function getPrestamoforUser(tabla, id){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id_usuario = ?`, id, (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}

// **************** Querys Prestamo ****************


// **************** Querys Contrato ****************

function agregarContrato(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, [data], (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}

function eliminarContrato(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id_contrato = ?;`, [data.id_contrato], (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}


// **************** Querys Contrato ****************

// **************** Querys Movimientos ****************

function agregarMovimiento(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, [data], (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}



// **************** Querys Movimientos ****************

// **************** Querys Transferencias ****************

function datosPreTransferencia(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT
        m.cuenta_origen,
        m.cuenta_destino,
        cb_destino.id_usuario AS id_usuario_destino,
        cb_origen.id_usuario AS id_usuario_origen
    FROM
        ${tabla} m
    JOIN
        cuenta_bancaria cb_destino ON m.cuenta_destino = cb_destino.cuenta_bancaria
    JOIN
        cuenta_bancaria cb_origen ON m.cuenta_origen = cb_origen.cuenta_bancaria
    WHERE
        m.cuenta_origen = ? AND m.cuenta_destino = ?`, [data.cuenta_origen, data.cuenta_destino], (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}

function transferencia(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE INTO ${tabla} SET ?`, [data], (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}



// **************** Querys Transferencias ****************



module.exports = {
//--------------------- usuarios
    todos,
    uno,
    agregar,
    eliminar,
//--------------------  login
    queryLogin,
    getRol,
//----------------------cuentas
    agregarCuenta,
    eliminarCuenta,
    actualizarCuenta,
    uno_cuentaBancaria,
    todos_idUsuario,    

//----------------------Prestamos
    agregarPrestamo,
    eliminarPrestamo,
    getPrestamo,
    getPrestamoforUser,
    actualizarPrestamo,

//----------------------Contratos
    agregarContrato,
    eliminarContrato,

//----------------------Movimientos
    agregarMovimiento,

//----------------------Transferencias
    datosPreTransferencia,
    transferencia
}