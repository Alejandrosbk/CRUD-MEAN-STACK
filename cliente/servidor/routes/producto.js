// RUTAS PARA PRODUCTO
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// RUTA PARA QUE EL USUARIO ACCEDA A LA API/PRODUCTOS
router.post('/', productoController.crearProducto);
router.get('/', productoController.obtenerProductos);
router.put('/:id', productoController.actualizarProductos);
router.get('/:id', productoController.consultarProductos);
router.delete('/:id', productoController.eliminarProductos);

module.exports = router;