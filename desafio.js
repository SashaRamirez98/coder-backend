class ProductManager {
    constructor() {
        this.products = [];
    }

    getProducts() {
        return [...this.products]; // con spread operator para no modificar la matriz original
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const replyCode = this.products.find(product => product.code === code); // evito que se repita el codigo
        if (replyCode) {
            throw new Error('El código del producto ya está en uso.');
        }

        const id = this.generateUniqueId(); // genero un id único automáticamente

        const newProduct = { // creo un nuevo producto
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(newProduct); 

        return newProduct;
    }

    getProductById(id) { //selecciono unicamente el ID del producto
        const product = this.products.find(product => product.id === id);
        if (!product){
            throw new Error ('Producto no encontrado.');
        }
        return product;
    }

    generateUniqueId() { // definición correcta del método
        return '_' + Math.random().toString(36).substring(2, 11);
    }
}

const productManager = new ProductManager(); //creo la instancia

console.log(productManager.getProducts());

try { //agrego un nuevo producto
    const newProduct = productManager.addProduct('Producto 1', 'Descripcion N1', 200, 'Sin imagen', 'zxc456', 20);
    console.log('¡Prodcuto agregado exitosamente!', newProduct);
} catch (error) {
    console.error('Error al agregar producto: ', error.message);
}

console.log(productManager.getProducts());

try { //compruebo que NO acepte repetir el codigo
    productManager.addProduct('Producto 2', 'Descripcion N2', 500, 'Sin imagen', 'zxc456', 25);
    console.log('¡Prodcuto agregado exitosamente!', newProduct);
} catch (error) {
    console.error('Error al agregar producto: ', error.message);
}

const productId = productManager.getProducts()[0].id; //muestro solo el ID del producto cargado
console.log('El ID del producto es: ', productId);