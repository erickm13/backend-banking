const express = require('express');
const respuesta = require('../../red/respuesta');
const controlador = require('./index');
const error = require('../../middleware/error');
const router = express.Router();
router.get('/', todos);
router.get('/:id', uno);
router.get('/searchIdUser/:id', unoForUser);
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

async function unoForUser(req, res, next)  {

    try {
        const items = await controlador.unoForUser(req.params.id);
        respuesta.succes(req, res, items, 200);
        
    } catch (error) {
        next(error);
    }
};

 async function uno(req, res, next)  {

    try {
        const items = await controlador.uno(req.params.id);
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
            mensaje = 'Prestamo Solicitado Satisfactoriamente';
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
        respuesta.succes(req, res, 'Prestamo eliminado Satisfactoriamente', 200);
        
    } catch (error) {
        next(error);
    }
};

async function actualizar(req, res, next)  {

    try {
        const items = await controlador.actualizar(req.body);
        respuesta.succes(req, res, 'Prestamo actualizado Satisfactoriamente', 201);
        
    } catch (error) {
        next(error);
    }
};

module.exports = router;