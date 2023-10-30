const auth = require('../../auth');

module.exports = function chequearAuth(){

    function middleware(req, res, next){
        const id_usuario = req.body.id_usuario;
        auth.chequearToken.confirmarToken(req, id_usuario);
        next();
    }

    return middleware;
}