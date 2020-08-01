import{ Injectable } from '@angular/core';
import { User } from './user';
import { htmlPost } from '../community/community.component';

@Injectable()
export class Emotion {
    emo: string = 'test';
    userId: string = null;
    user: User = null;
    cPosts: htmlPost[] = null;
}