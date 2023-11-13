const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const usuarios = require('./modulos/usuarios/rutas');
const auth = require('./modulos/auth/rutas');
const cuentas = require('./modulos/cuentas/rutas');
const error = require('./red/errors');
const cors = require('cors');
const prestamos = require('./modulos/prestamos/rutas');
const empresas = require('./modulos/empresas/rutas');
const movimientos = require('./modulos/movimientos/rutas');
const app = express();

//Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//configuracion
app.set('port', config.app.port);

//rutas
app.use('/api/usuarios', usuarios);
app.use('/api/auth', auth);
app.use('/api/cuentas', cuentas);
app.use('/api/prestamos', prestamos);
app.use('/api/empresas', empresas);
app.use('/api/movimientos', movimientos);
app.use(error);
module.exports = app;