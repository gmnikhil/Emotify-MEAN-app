import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommunityService } from '../services/community.service';
import { Post } from '../shared/post';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  loc: boolean =true;
  posts: Post[];
  errMess: string;
  constructor(private communityService: CommunityService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.setStyle(document.body,'background-image','url(../../assets/grey.jpg)');
    this.communityService.getPosts().subscribe((posts) => this.posts = posts,errMess => this.errMess =<any>errMess,()=>console.log(this.posts));
  }

}
