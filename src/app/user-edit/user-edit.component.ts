import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder,FormGroup,Validators, FormControl} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../shared/article';
import { Cat } from '../cty-post/cty-post.component';
import { ArticlesService } from '../services/articles.service';
import { Emotion } from '../shared/emotion';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  emotion: Emotion;
  errMess: string;
  bool: boolean = false;
  article: Article;
  articleForm: FormGroup;
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
  @ViewChild("eform") editFormDirective;
  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private articleService: ArticlesService) { 
    this.createForm();
  }

  ngOnInit(): void {
  }
  createForm() {
    this.passForm=this.fb.group({
    id: [""],
    author: [""],
    content: [""],
    category: [""]
    })
    this.articleForm=this.fb.group({
      content: ["",[Validators.required,Validators.maxLength(100)]],
      category: [""]
    });
  }

  catClick(emo :string) {
    this.passForm.value.category=emo;
    this.articleForm.value.category=emo;
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
    this.passForm.value.author = this.emotion.userId;
    this.passForm.value.content = this.articleForm.value.content;
    this.articleService.getId(this.passForm.value.category).subscribe(id=>{console.log(id);this.passForm.value.id=id},
    err=>this.errMess=err);
    if(this.errMess)
      return console.log('ERROR');
    console.log(this.passForm);
    this.articleService.postArticle(this.passForm.value).subscribe(article=>this.article=article);
    console.log(this.article);
    //this.postFormDirective.resetForm();    
    this.articleForm.reset({
      content:"",
      category:""
    });
    //this.activeModal.close('Close click');
  }
}
