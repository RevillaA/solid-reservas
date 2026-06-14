export interface Post {
    id: number;
    title: string;
    body: string;
}

export interface PostProvider {
    getFakePosts(): Promise<Post[]>;
}
