import { Component, OnInit, Renderer2, ElementRef} from '@angular/core';
import { CommunityService } from '../services/community.service';
import { Post } from '../shared/post';
import { LikesService } from '../services/likes.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/user';
import {Emotion } from '../shared/emotion';
import { AuthService } from '../services/auth.service';
import { Cat } from '../cty-post/cty-post.component';
import { URL } from '../shared/url'; 
import {Subscription} from 'rxjs';
import { community } from '../animations/app.animations';

export interface htmlPost {
    date: string;
    content: string;
    category: string;
    userName: string;
    title: string;
    _id: string;
    userId: string;
    userImage: string;
    like: boolean;
}

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css'],
  animations: [
    community()
  ]
})
export class CommunityComponent implements OnInit {
  load: boolean
  url: string = URL;
  posts: Post[];
  users: User[];
  errMess: string;
  templatePost: htmlPost[] = [];
  fullPost: htmlPost[] = [];
  user: User;
  bool :Boolean = false;
  subscription: Subscription;
  cats: Cat[] =[
    {letter:'#H',color:'orange', emotion:'Happy', bg:false},
    {letter:'#S',color:'grey', emotion:'Sad', bg:false},
    {letter:'#N',color:'crimson', emotion: 'Nervous', bg:false},
    {letter:'#L',color:'lightblue', emotion: 'Love', bg:false},
    {letter:'#A',color:'black', emotion: 'Alone', bg:false},
    {letter:'#F',color:'violet', emotion: 'Frightened', bg:false},
    {letter:'#B',color:'gold', emotion: 'Broken', bg:false},
    {letter:'#I',color:'green', emotion: 'Integrity', bg:false}
  ]

  constructor(private communityService: CommunityService, private likeService: LikesService,
    private userService: UserService, private emotion: Emotion, private authService: AuthService,
    private renderer: Renderer2, private el: ElementRef) {
      this.load=false;
     }

  ngOnInit(): void {
    this.renderer.setStyle(document.body,'background-color','rgb(256, 230, 256)');
    this.authService.getUserId().subscribe(id=>{
      this.communityService.getPosts().subscribe((posts) => {
        this.posts = posts;
        this.userService.getUsers().subscribe((users)=>{
          this.users=users;
          this.userService.getUserWithId(id).subscribe(u=>{
            this.user=u[0];
            this.templatePost=[];
            for(var i=0; i<this.posts.length;i++) {
              for(var j=0; j<this.users.length;j++) {
                let post = this.posts[i];
                let user= this.users[j];
                let bool = false;
                let index: number;
                if(user._id===post.userId) {
                  for(var k=0;k<this.user.likes.length;k++){
                    if(this.user.likes[k]._id===post._id) {
                      index=k;
                      break;
                    }
                  }
                  if(index>-1)
                    bool = true;
                  this.templatePost.push({
                    date: post.date,
                    content: post.content,
                    category: post.category,
                    userName: user.username,
                    title: post.title,
                    userImage: user.userImage,
                    like: bool,
                    _id: post._id,
                    userId: post.userId});
                    break;
                }
              }
            }
            this.templatePost.sort(function(a, b) {
              return (a.date > b.date) ? -1 : ((a.date < b.date) ? 1 : 0);
          });
            this.fullPost = this.templatePost;
            this.load=true;
          },err=>this.errMess="Oops... Something went wrong!");
        },err=>this.errMess="Oops... Something went wrong!");
      },err=>this.errMess="Oops... Something went wrong!");

    },err=>this.errMess="Oops... Something went wrong!");
    
  }

  catClick(emo :string) {
    this.templatePost=null;
    for(var i=0; i<this.cats.length; i++)
      {
        if(this.cats[i].emotion!=emo)
          this.cats[i].bg=false;
        else {
          if(this.cats[i].bg===true) {
            this.cats[i].bg=false;
            this.templatePost = this.fullPost;
          }
          else {
            this.cats[i].bg=true;
            this.templatePost = this.fullPost.filter(post=>{
              return post.category===emo;
            });
          }
        }
          
      } 
    this.bool=true;
  }
  getStyle(bool: boolean, color: string) {
    if(bool===true) {
      return {'background-color': ''+color,'color':'whitesmoke'};
    }
  }

  fnLike(tindex: number) {
    let post = this.templatePost[tindex];
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
        this.templatePost[tindex].like=!this.templatePost[tindex].like;
      },err=>{
        alert("Couldnt be liked!");
      });
    
    }
}
