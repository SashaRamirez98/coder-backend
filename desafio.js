const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.products = [];
        this.lastId = 0;
        this.path = filePath;
        this.loadFromFile(); // Cargo los productos desde el archivo al instanciar la clase
    }

    loadFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
            // Obtengo el último ID de los productos cargados
            if (this.products.length > 0) {
                this.lastId = Math.max(...this.products.map(product => product.id));
            }
        } catch (error) {
            console.error('Error al cargar productos desde el archivo:', error);
        }
    }

    saveToFile() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
            console.log('Productos guardados en el archivo:', this.path);
        } catch (error) {
            console.error('Error al guardar productos en el archivo:', error);
        }
    }

    getProducts() {
        return [...this.products];
    }

    addProduct(newProduct) {
        const { title, description, price, thumbnail, code, stock } = newProduct;

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error('Complete los campos obligatorios del nuevo producto.');
        }

        if (this.products.some(product => product.code === code)) {
            throw new Error('El código del producto ya está en uso.');
        }

        const id = ++this.lastId;
        const product = { id, ...newProduct };
        this.products.push(product);
        this.saveToFile(); // Guardo productos en el archivo después de agregar uno nuevo

        return product;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error('Producto no encontrado.');
        }
        return product;
    }

    updateProduct(id, updatedFields) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error('Producto no encontrado.');
        }

        this.products[index] = { ...this.products[index], ...updatedFields };
        this.saveToFile(); // Guardo productos en el archivo después de actualizar

        return this.products[index];
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error('Producto no encontrado.');
        }

        this.products.splice(index, 1);
        this.saveToFile(); // Guardo productos en el archivo después de eliminar

        return true;
    }
}

// Pruebas
const filePath = './productos.json'; // Ruta del archivo donde se almacenan los productos
const productManager = new ProductManager(filePath);

console.log("Productos antes de agregar:", productManager.getProducts());

try {
    const newProduct = productManager.addProduct({
        title: 'producto prueba',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        code: 'abc123',
        stock: 25
    });
    console.log('Producto agregado:', newProduct);
} catch (error) {
    console.error('Error al agregar producto: ', error.message);
}

console.log("Productos después de agregar:", productManager.getProducts());

const productId = productManager.getProducts()[0].id;
console.log("Producto con ID 1:", productManager.getProductById(productId));

try {
    const updatedProduct = productManager.updateProduct(productId, { price: 300 });
    console.log('Producto actualizado:', updatedProduct);
} catch (error) {
    console.error('Error al actualizar producto: ', error.message);
}

try {
    const deleted = productManager.deleteProduct(productId);
    console.log('Producto eliminado:', deleted);
} catch (error) {
    console.error('Error al eliminar producto: ', error.message);
}
