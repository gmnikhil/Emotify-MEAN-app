import { Component, OnInit, Renderer2 } from '@angular/core';
import { Emotion } from '../shared/emotion';
import { ArticlesService } from '../services/articles.service';
import { Article } from '../shared/article';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {
  counter: number;
  errMess: string;
  articles: Article[];
  cmax: number;
  username: string;
  bool: boolean

  constructor(private emotion: Emotion, private articlesService: ArticlesService, private renderer: Renderer2,
    private authService: AuthService, private userService: UserService) {
    this.bool=false;
   }

  ngOnInit(): void {
    this.counter=1;
    this.articlesService.getCategorizedArticles(this.emotion.emo)
    .subscribe((articles)=>{
      this.articles=articles;
      this.cmax = this.articles.length;
      this.bool=true;
    },
    errmess=>this.errMess=<any>errmess);
    this.authService.getUserId().subscribe(id=>{
      this.userService.getUserWithId(id).subscribe(user=>this.username=user[0].username),err=>this.errMess="Oops... Something went wrong!"
    },err=>this.errMess="Oops... Something went wrong!");
  }
  forward() {
    this.counter = this.counter + 1;

    //window.scroll(0,0);

    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
  }, 16);
  }
  back() {
    this.counter = this.counter - 1;
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
  }, 16);
  }
}
