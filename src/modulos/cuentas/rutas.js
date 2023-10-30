const express = require('express');
const respuesta = require('../../red/respuesta');
const controlador = require('./index');
const seguridad = require('./seguridad');
const router = express.Router();
router.get('/', todos);
router.get('/:id', uno);
router.post('/', seguridad(), agregar);
router.delete('/', seguridad(), eliminar);


 async function todos(req, res, next)  {
    try {
        const items = await controlador.todos();
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
            mensaje = 'Usuario Guardado Satisfactoriamente';
        }else{
            mensaje = 'Usuario Actualizado Satisfactoriamente';
        }
        respuesta.succes(req, res, mensaje, 201);
    } catch (error) {
        next(error);
    }
};

async function eliminar(req, res, next)  {

    try {
        const items = await controlador.eliminar(req.body);
        respuesta.succes(req, res, 'Item Eliminado Satisfactoriamente', 200);
        
    } catch (error) {
        next(error);
    }
};

module.exports = router;