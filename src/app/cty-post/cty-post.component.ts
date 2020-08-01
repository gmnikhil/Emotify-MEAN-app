import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Emotion } from '../shared/emotion';
import{ CommunityService } from '../services/community.service';
import { Post } from '../shared/post';

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
  errMess: string;
  postForm: FormGroup;
  passForm: FormGroup;
  title: FormControl;
  sub: boolean;
  content: FormControl;
  cats: Cat[] =[
    {letter:'#H',color:'violet', emotion:'Happy', bg:false},
    {letter:'#S',color:'grey', emotion:'Sad', bg:false},
    {letter:'#N',color:'crimson', emotion: 'Nervous', bg:false},
    {letter:'#L',color:'lightblue', emotion: 'Love', bg:false},
    {letter:'#A',color:'black', emotion: 'Alone', bg:false},
    {letter:'#F',color:'deeppink', emotion: 'Frightened', bg:false},
    {letter:'#B',color:'gold', emotion: 'Broken', bg:false},
    {letter:'#I',color:'green', emotion: 'Integrity', bg:false}
  ]

  @ViewChild("pform") postFormDirective;
  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, 
    private emotion: Emotion, private communityService: CommunityService) {
    this.createFormControls();
    this.createForm();
    this.sub=false;
   }

  ngOnInit(): void {
  }
  createFormControls() {
    this.title = new FormControl("",[Validators.required,Validators.maxLength(40)]);
    this.content = new FormControl("",[Validators.required,Validators.maxLength(500)]);
  }
  createForm() {
    this.passForm=this.fb.group({
    date: [""],
    id: [""],
    title: [""],
    content: [""],
    category: [""],
    userId: [""]
    })
    this.postForm=this.fb.group({
      title: this.title,
      content: this.content,
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
    this.sub=true;
    this.passForm.value.date = new Date().toISOString();
    this.passForm.value.userId = this.emotion.userId;
    this.passForm.value.content = this.postForm.value.content;
    this.passForm.value.title = this.postForm.value.title;
    this.communityService.communityPost(this.passForm.value).subscribe(post=> {
      this.post=post;
      this.sub=false;
      this.postForm.reset({
        title:"",
        content:"",
        category:""
      });
      this.emotion.cPosts=null;
      this.activeModal.close('Close click');
      location.reload();
    },err=>{
      this.sub=false;
      this.errMess="Oops... Something went wrong!"});
    //this.postFormDirective.resetForm();    
    
  }
 
  
}
