const tabla = 'auth';
const auth = require('../../auth');
const bcrypt = require('bcrypt');
const error = require('../../middleware/error');
module.exports = function(dbInyectada){

    let db = dbInyectada;
    
    if(!db){
        db = require('../../DB/mysql');
    }

    
    async function agregar(data){
        const authData = {
            id_usuario: data.id_usuario, 
        }
        if(data.username){
            authData.username = data.username;
        }

        if(data.password){
            authData.password = await bcrypt.hash(data.password.toString(), 5);
        }

        if(data.token){
            authData.token = data.token;
        }
        return db.agregar(tabla, authData);
    }

    
    async function login(username, password){
        const data = await db.queryLogin(tabla, {username: username});
        console.log(data);
        if(data){
            return bcrypt.compare(password, data.password)
                .then(resultado => {
                    if(resultado === true){
                        //Generar token
                        return auth.asignarToken({data});
                    }else{
                        throw error('Password invalido', 401);
                    }
                });
        }else{
            throw new error('Username invalido', 401);
        }
    }
    return{
    agregar,
    login,
    }
}