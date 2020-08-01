import { Component, OnInit } from '@angular/core';
import { Emotion } from '../shared/emotion';
import { ArticlesService } from '../services/articles.service';
import { Article } from '../shared/article';
import { AuthService } from '../services/auth.service';
import { opace } from '../animations/app.animations';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  animations: [
    opace()
  ]
})

export class ArticleComponent implements OnInit {
  counter: number;
  errMess: string;
  articles: Article[];
  cmax: number;
  username: string;
  bool: boolean

  constructor(private emotion: Emotion, private articlesService: ArticlesService,
    private authService: AuthService) {
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

      this.username=this.emotion.user.username;
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
