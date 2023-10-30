const mysql = require('mysql');
const config = require('../config');

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
// **************** Querys Login ****************


module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
    queryLogin
}