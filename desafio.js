class ProductManager {
    constructor() {
        this.products = [];
        this.lastId = 0;
    }

    getProducts() {
        return [...this.products]; // con spread operator para no modificar la matriz original
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error ('Todos los campos son obligatorios.');
        }

        const replyCode = this.products.find(product => product.code === code); // evito que se repita el codigo
        if (replyCode) {
            throw new Error ('El código del producto ya está en uso.');
        }

        const id = ++this.lastId; // incremeneto el ultimo Id y lo asigno

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
            console.error('Producto no encontrado: '); 
        }
        return product;
    }
}

const productManager = new ProductManager(); //creo la instancia

console.log(productManager.getProducts());

try { //agrego un nuevo producto
    const newProduct = productManager.addProduct('Producto 1', 'Descripcion N1', 200, 'Sin imagen', 'zxc456', 20);
    console.log('¡Producto agregado exitosamente!', newProduct);
} catch (error) {
    console.error('Error al agregar producto: ', error.message);
}

console.log(productManager.getProducts());

try { //compruebo que NO acepte repetir el codigo
    const newProduct = productManager.addProduct('Producto 2', 'Descripcion N2', 500, 'Sin imagen', 'zxc456', 25);
    console.log('¡Producto agregado exitosamente!', newProduct);
} catch (error) {
    console.error('Error al agregar producto: ', error.message);
}

try { //cargo un producto mas de ejemplo
    const newProduct = productManager.addProduct('Producto 3', 'Descripcion N3', 1000, 'Sin imagen', 'qwe789', 30);
    console.log('¡Producto agregado exitosamente!', newProduct);
} catch (error) {
    console.error('Error al agregar producto: ', error.message);
}

try { //cargo otro ejemplo para corroborar las validaciones de los campos
    const newProduct = productManager.addProduct('Producto 4', 'Descripcion 4', 100, 'vbn159', 5); //elimine el campo thumbnail
    console.log('¡Producto agregado exitosamente!', newProduct);
} catch (error) {
    console.error('Error al agregar producto: ', error.message);
}

console.log(productManager.getProducts());

const productsIds = productManager.getProducts().map(product => product.id); //muestro solo los IDs de los productos agregados
console.log('Los IDs agregados son: ', productsIds);