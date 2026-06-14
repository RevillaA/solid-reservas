import { PostProvider } from '../05-dip/post-provider';

export class LocalDatabaseService implements PostProvider {

    async getFakePosts() {
        return [
            { id: 1, title: 'Avistamiento de Jaguar', body: 'Se reporto un jaguar cerca del rio.' },
            { id: 2, title: 'Nuevas Orquideas', body: 'Han florecido las especies raras en el jardin botanico.' }
        ];
    }

}

export class JsonDatabaseService implements PostProvider {

    async getFakePosts() {
        return [
            { id: 1, title: 'JSON Post 1', body: 'Contenido desde JSON' }
        ];
    }

}
