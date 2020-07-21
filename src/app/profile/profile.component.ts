import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { CommunityService } from '../services/community.service';
import { Post } from '../shared/post';
import { User } from '../shared/user';
import{ UserService } from '../services/user.service';
import { Emotion } from '../shared/emotion';
import { AuthService } from '../services/auth.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CtyPostComponent } from '../cty-post/cty-post.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { htmlPost } from '../community/community.component';
import { URL } from '../shared/url';
import { profile, proPosts, proLikes } from '../animations/app.animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    profile(),
    proPosts(),
    proLikes()
  ]
})
export class ProfileComponent implements OnInit {
load1: boolean;
load2: boolean;
user: User;
bool: boolean = false;
userPosts: htmlPost[];
likedPosts: htmlPost[];
posts :Post[];
users:User[];
url :string = URL;

errMess: string;
  constructor(private communityService: CommunityService, private userService: UserService, 
    private emotion: Emotion, private renderer: Renderer2, 
    private modalService: NgbModal, private authService: AuthService, private router: Router) { 
      this.load1=false;
      this.load2=false;
    }

  ngOnInit(): void {
    this.renderer.setStyle(document.body,'background-color','rgb(256, 230, 256)');
    this.authService.getUserId().subscribe(id=>{
      this.userService.getUserWithId(id).subscribe(u=>{
        this.user = u[0];
        this.communityService.getUsersPosts(this.user._id).subscribe(posts=>{
          this.posts = posts;
          this.PostsInit();
          this.load1=true;
        },err=>this.errMess="Oops.. Something went wrong!");
        this.userService.getUsers().subscribe(users=>{
          this.users = users;
          this.likeInit();
          this.load2=true;
        },err=>this.errMess="Oops... Something went wrong!");
      },err=>this.errMess="Oops... Something went wrong!");
    },err=>this.errMess="Oops... Something went wrong!");
  }
  PostsInit() {
    this.userPosts=[];
    for(var i=0;i<this.posts.length;i++) {
      let post = this.posts[i];
      let bool = false;
      for(var k=0;k<this.user.likes.length;k++) {
        if(this.user.likes[k]._id===post._id) {
          bool=true;
          break;
        }
      }
      this.userPosts.push({
        date: post.date,
        content: post.content,
        category: post.category,
        userName: this.user.username,
        title: post.title,
        userImage: this.user.userImage,
        like: bool,
        _id: post._id,
        userId: post.userId});
    }
    this.userPosts.sort(function(a, b) {
      return (a.date > b.date) ? -1 : ((a.date < b.date) ? 1 : 0);
  });
  }
  likeInit() {
    this.likedPosts=[];
    for(var j=this.user.likes.length-1;j>=0;j--) {
      for(var h=0;h<this.users.length;h++) {
        let user=this.users[h];
        let post = this.user.likes[j];
        if(post.userId===user._id) {
          this.likedPosts.push({
            date: post.date,
            content: post.content,
            category: post.category,
            userName: user.username,
            title: post.title,
            userImage: user.userImage,
            like: true,
            _id: post._id,
            userId: post.userId});
          break;
        }
      }
    }
  }
  delFn(_id : string, index :number) {
    let tuser = this.user;
    for(var k=0;k<tuser.likes.length;k++){
      if(tuser.likes[k]._id===_id) {
        delete tuser.likes[k];
        tuser.likes = tuser.likes.filter(el=>{
          return el!=null;
        });
        this.userService.editUser(tuser).subscribe(resp=>{},err=>{
          alert('couldnt be deleted');
          return;
        });
        break;
      }
    }
    this.communityService.deletePost(_id).subscribe(resp=>{
      delete this.userPosts[index];
      this.userPosts = this.userPosts.filter(el=>{
        return el != null;
      });
      this.user=tuser;
      this.likeInit();
    },err=>alert('couldnt be deleted'));
    //add delete to community service
    //then from this.userPosts find the post and delete and filter
  }
  getPostStyle() {
    if(this.bool===true) {
      this.bool=!this.bool; 
      this.ngOnInit();
    }
  }
  getLikeStyle() {
    if(this.bool===false) {
      this.bool=!this.bool;
      this.ngOnInit();
    }
  }
  likeOfLikes(post: htmlPost,index:number) {
    let po: Post = {
      date: post.date,
      _id : post._id,
      content : post.content,
      category : post.category,
      userId : post.userId,
      title : post.title
      }
      let uindex =-1;
      for(var i=0;i<this.user.likes.length;i++) {
        if(po._id===this.user.likes[i]._id) {
          uindex=i;
          break;
        }
      }
      let tuser = this.user;
      delete tuser.likes[uindex];
      tuser.likes = tuser.likes.filter(el=>{
        return el != null;
      });
      this.userService.editUser(tuser).subscribe(resp=>{
        this.user = tuser;
        this.likedPosts[index].like=!this.likedPosts[index].like;
        this.likeInit();
      },err=>{
        alert("Oops.. Something went wrong!");
    });
  }
  likeOfPosts(post: htmlPost,tindex: number) {
    let po: Post = {
    date: post.date,
    _id : post._id,
    content : post.content,
    category : post.category,
    userId : post.userId,
    title : post.title
    }
    let uindex=-1;
    for(var i=0;i<this.user.likes.length;i++) {
      if(po._id===this.user.likes[i]._id) {
        uindex=i;
        break;
      }
    }
    let tuser = this.user;
    if(uindex>-1) {
      delete tuser.likes[uindex];
      tuser.likes = tuser.likes.filter(el=>{
        return el != null;
      });
    }
    else 
      tuser.likes.push(po);
    this.userService.editUser(tuser).subscribe(resp=>{
        this.user = tuser;
        this.userPosts[tindex].like=!this.userPosts[tindex].like;
        this.likeInit();
      },err=>{
        alert("Couldnt be liked!");
    });
  }
  logout() {
    this.authService.logOut();
  }
  openCtyPost() {
    this.modalService.open(CtyPostComponent);
  }
  openUserEdit() {
    this.modalService.open(UserEditComponent);
  }
}
