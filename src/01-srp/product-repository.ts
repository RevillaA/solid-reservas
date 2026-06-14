import { Product } from './product';

export class ProductRepository {

    // Simula la persistencia local del inventario para este ejemplo.
    private products: Product[] = [];

    loadProduct(id: number) {
        console.log(`Cargando producto con ID: ${id} desde el inventario del parque...`);
        return this.products.find(product => product.id === id);
    }

    saveProduct(product: Product) {
        console.log(`Guardando el producto ${product.name} en la base de datos de la reserva...`);
        this.products.push(product);
    }

}
