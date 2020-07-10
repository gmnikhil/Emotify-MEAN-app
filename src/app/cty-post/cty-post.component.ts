import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder,FormGroup,Validators, FormControl} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';
import { Emotion } from '../shared/emotion';
import{CommunityService} from '../services/community.service';
import {Post} from '../shared/post';

export interface Cat {
  letter: string;
  color: string;
  emotion: string;
  bg: boolean;
}
@Component({
  selector: 'app-cty-post',
  templateUrl: './cty-post.component.html',
  styleUrls: ['./cty-post.component.css']
})
export class CtyPostComponent implements OnInit {
  bool: boolean = false;
  post: Post;
  postForm: FormGroup;
  passForm: FormGroup; 
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

  @ViewChild("pform") postFormDirective;
  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private emotion: Emotion, private communityService: CommunityService) {
    this.createForm();
   }

  ngOnInit(): void {
  }
  createForm() {
    this.passForm=this.fb.group({
    time: [""],
    id: [""],
    title: [""],
    content: [""],
    category: [""],
    userid: [""]
    })
    this.postForm=this.fb.group({
      title: ["",[Validators.required,Validators.maxLength(25)]],
      content: ["",[Validators.required,Validators.maxLength(100)]],
      category: [""]
    });
  }

  catClick(emo :string) {
    this.passForm.value.category=emo;
    this.postForm.value.category=emo;
    for(let i=0; i<this.cats.length; i++)
      {
        if(this.cats[i].emotion!=emo)
          this.cats[i].bg=false;
        else
          this.cats[i].bg=true;
      } 
    this.bool=true;
  }
  getStyle(bool: boolean, color: string) {
    if(bool===true) {
      return {'background-color': ''+color,'color':'whitesmoke'};
    }
  }
  onSubmit() {
    this.passForm.value.time = new Date().toISOString();
    this.passForm.value.userid = this.emotion.userId;
    this.passForm.value.content = this.postForm.value.content;
    this.passForm.value.title = this.postForm.value.title;
    console.log(this.passForm);
    this.communityService.communityPost(this.passForm.value).subscribe(post=>this.post=post);
    console.log(this.post);
    //this.postFormDirective.resetForm();    
    this.postForm.reset({
      title:"",
      content:"",
      category:""
    });
    //this.activeModal.close('Close click');
  }
 
  
}
