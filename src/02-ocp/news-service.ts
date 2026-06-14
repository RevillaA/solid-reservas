import { ApiResourceService } from './api-resource-service';

type NewsItem = {
    id: number;
    title: string;
    body: string;
}

type PhotoItem = {
    id: number;
    title: string;
    url: string;
}

export class NewsService extends ApiResourceService<NewsItem[]> {

    constructor() {
        super('https://jsonplaceholder.typicode.com/posts');
    }

    // El servicio conserva su caso de uso y delega la obtencion comun al modulo base.
    async getLatestNews() {
        console.log('Obteniendo noticias de la reserva biologica...');
        return this.fetchCollection();
    }

}

export class PhotosService extends ApiResourceService<PhotoItem[]> {

    constructor() {
        super('https://jsonplaceholder.typicode.com/photos');
    }

    // Para agregar otro recurso remoto basta crear un nuevo servicio especializado.
    async getGallery() {
        return this.fetchCollection();
    }

}
