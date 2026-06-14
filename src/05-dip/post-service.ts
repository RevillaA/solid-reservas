import { Post, PostProvider } from './post-provider';

export class PostService {

    private posts: Post[] = [];

    // El servicio de alto nivel depende del contrato del proveedor, no de una base concreta.
    constructor(private readonly databaseProvider: PostProvider) {}

    async getPosts() {
        this.posts = await this.databaseProvider.getFakePosts();
        return this.posts;
    }

}
