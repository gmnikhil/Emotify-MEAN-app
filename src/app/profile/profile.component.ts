import { Component, OnInit, Renderer2 } from '@angular/core';
import {CommunityService} from '../services/community.service';
import {Post} from '../shared/post';
import {User} from '../shared/user';
import{UserService} from '../services/user.service';
import {Emotion} from '../shared/emotion';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CtyPostComponent } from '../cty-post/cty-post.component';
import {UserEditComponent} from '../user-edit/user-edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
loc: boolean = true;
user: User;
userPosts: Post[];
errMess: string;
  constructor(private communityService: CommunityService, private userService: UserService, 
    private emotion: Emotion, private renderer: Renderer2, 
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.userService.getUserWithId(this.emotion.userId).subscribe(user=>this.user=user[0],err=>this.errMess=this.errMess); //checkarray[0] 
    this.communityService.getUsersPosts(this.emotion.userId).subscribe(posts=>this.userPosts=posts,err=>this.errMess=<any>this.errMess);
  }
  openCtyPost() {
    this.modalService.open(CtyPostComponent);
  }
  openUserEdit() {
    this.modalService.open(UserEditComponent);
  }
}
