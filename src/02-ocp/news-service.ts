/**
 * VIOLACION AL PRINCIPIO DE ABIERTO/CERRADO (OCP)
 *
 * En este modulo de noticias de la reserva, el servicio depende directamente
 * de un mecanismo concreto de acceso HTTP. Si quisieramos usar otra estrategia,
 * tendriamos que modificar este codigo interno.
 */

export class NewsService {
    // VIOLACION: Dependencia rigida de fetch()
    // Si la API cambia o queremos cambiar de cliente HTTP, este codigo debe modificarse.
    async getLatestNews() {
        console.log('Obteniendo noticias de la reserva biologica...');
        const resp = await fetch('https://jsonplaceholder.typicode.com/posts');
        return resp.json();
    }
}

export class PhotosService {
    async getGallery() {
        // Otra violacion repetida: si manana cambia el cliente HTTP, hay que tocar todos los archivos que lo usan.
        const resp = await fetch('https://jsonplaceholder.typicode.com/photos');
        return resp.json();
    }
}
