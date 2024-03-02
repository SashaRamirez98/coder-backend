import express from "express";
import { ProductManager } from "./productManager.js";

const app = express();
const PORT = 8080;

// Creo una instancia del gestor de productos con el archivo productos.json
const productManager = new ProductManager('../myFile/productos.json');

// Manejo las solicitudes de productos
app.get('/products', (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = limit ? productManager.getProducts().slice(0, limit) : productManager.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/products/:pid', (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = productManager.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});