/**
 * ProductBloc mantiene la API del caso de uso y delega cada tarea tecnica
 * a una clase especializada para evitar mezclar responsabilidades.
 */

import { CustomerNotifier } from './customer-notifier';
import { Product } from './product';
import { ProductRepository } from './product-repository';

export class ProductBloc {

    private productRepository = new ProductRepository();
    private customerNotifier = new CustomerNotifier();

    // La consulta de productos queda centralizada en el repositorio.
    loadProduct(id: number) {
        return this.productRepository.loadProduct(id);
    }

    // El bloc conserva la orquestacion, pero no conoce el detalle de guardado.
    saveProduct(product: Product) {
        this.productRepository.saveProduct(product);
    }

    // Las notificaciones salen a un colaborador dedicado.
    notifyCustomer(email: string, message: string) {
        this.customerNotifier.notifyCustomer(email, message);
    }

}
