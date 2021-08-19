const Producto = require("../models/Producto");

// METODO PARA CREAR PRODUCTOS
exports.crearProducto = async(req, res) => {
    // console.log(req.body);
    try {
        let producto;
        // CREAMOS EL PRODUCTO
        producto = new Producto(req.body);

        // ALMACENAR EL PRODUCTO
        await producto.save();
        res.send(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send("Hay un error");
    }
}

// METODO PARA OBTENER PRODUCTOS
exports.obtenerProductos = async(req, res) => {
    try {
        const productos = await Producto.find();
        // DEVOLVEMOS EL JSON AL CLIENTE CON LOS PRODUCTOS
        res.json(productos);

    } catch (error) {
        console.log(error);
        res.status(500).send("Hay un error");
    }
}

// METODO PARA ACTUALIZAR PRODUCTOS
exports.actualizarProductos = async(req, res) => {
    try {
        // EXTRAER VALORES QUE EL USUARIO VA A ACTUALIZAR
        const { nombre, categoria, ubicacion, precio } = req.body;
        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            res.status(404).json({ msg: 'No existe el Producto' });
        }

        producto.nombre = nombre;
        producto.categoria = categoria;
        producto.ubicacion = ubicacion;
        producto.precio = precio;

        producto = await Producto.findOneAndUpdate({ _id: req.params.id }, producto, { new: true });
        res.json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send("Hay un error");
    }
}


// METODO PARA CAPTURAR LOS DATOS Y ACTUALIZAR PRODUCTOS
exports.consultarProductos = async(req, res) => {
    try {
        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            res.status(404).json({ msg: 'No existe el Producto' });
        }
        res.json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send("Hay un error");
    }
}


// METODO PARA ELIMINAR LOS PRODUCTOS
exports.eliminarProductos = async(req, res) => {
    try {
        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            res.status(404).json({ msg: 'No existe el Producto' });
        }
        await Producto.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Producto eliminado con exito' });

    } catch (error) {
        console.log(error);
        res.status(500).send("Hay un error");
    }
}