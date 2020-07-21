import { Post } from './post';

export class User {
    username: string;
    password: string;
    name: string;
    _id: string;
    email: string;
    userImage: string;
    likes: Post[];
}