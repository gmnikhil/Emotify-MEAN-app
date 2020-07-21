import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { Post } from '../shared/post';
import { UserService } from '../services/user.service';
import { Observable, Subject} from 'rxjs';
import { Emotion } from '../shared/emotion';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  user: User;
  errMess: string;
  oldUser: User;
  index: number;
  newUser: Subject<User> = new Subject<User>();

  constructor(private userService: UserService, private emotion: Emotion) { }

  likeFn(post :Post, user): Observable<any> {
    console.log(this.newUser);
    this.user=user[0];
      this.oldUser=this.user;
      console.log(user);
      console.log(post);
      this.index = this.user.likes.indexOf(post);
      /*
      for(var i=0;i<this.user.likes.length;i++){
        if(this.user.likes[i]._id===post._id) {
          this.index=i;
          break;
        }
      } */
      if(this.index>-1) {
        delete this.user.likes[this.index];
        this.user.likes = this.user.likes.filter(el=>{
          return el != null;
      });
    }
      else
        this.user.likes.push(post);
      console.log(this.user);
      this.userService.editUser(this.user).subscribe(resp=>{
        this.newUser.next(this.user);
      },err=>{
        this.newUser.next(this.oldUser);
      });
    return this.newUser.asObservable()
  }
  destroy() {
    this.newUser.next(undefined);
  }
}
