const express = require('express');
const respuesta = require('../../red/respuesta');
const controlador = require('./index');
const error = require('../../middleware/error');
const router = express.Router();
router.get('/', todos);
router.get('/:id', uno);
router.get('/searchIdUser/:id', todos_idUsuario);
router.get('/searchCB/:id', uno_cuentaBancaria);
router.post('/', agregar);
router.delete('/', eliminar);
router.put('/', actualizar);


 async function todos(req, res, next)  {
    try {
        const items = await controlador.todos();
        respuesta.succes(req, res, items, 200);
        
    } catch (error) {
        next(error);
    }

};

async function todos_idUsuario(req, res, next)  {
    try {
        const items = await controlador.todos_idUsuario(req.params.id);
        respuesta.succes(req, res, items, 200);
        
    } catch (error) {
        next(error);
    }

};

async function uno_cuentaBancaria(req, res, next)  {
    try {
        const items = await controlador.uno_cuentaBancaria(req.params.id);
        respuesta.succes(req, res, items, 200);
        
    } catch (error) {
        next(error);
    }

};

 async function uno(req, res, next)  {

    try {
        const items = await controlador.uno_cuentaBancaria(req.params.id);
        respuesta.succes(req, res, items, 200);
        
    } catch (error) {
        next(error);
    }
};

async function agregar(req, res, next)  {

    try {
        const items = await controlador.agregar(req.body);
        if(req.body.id_usuario == 0){
            mensaje = 'EL USUARIO NO EXISTE'
            throw error(mensaje, 401);
        }else{
            mensaje = 'Cuenta Creada Satisfactoriamente';
            respuesta.succes(req, res, mensaje, 201);
        }
    } catch (error) {
        next(error);    
    }
};

async function eliminar(req, res, next)  {

    try {
        const items = await controlador.eliminar(req.body);
        console.log(items);
        respuesta.succes(req, res, 'Cuenta eliminada Satisfactoriamente', 200);
        
    } catch (error) {
        next(error);
    }
};

async function actualizar(req, res, next)  {

    try {
        const items = await controlador.actualizar(req.body);
        respuesta.succes(req, res, 'Cuenta actualizada Satisfactoriamente', 201);
        
    } catch (error) {
        next(error);
    }
};

module.exports = router;