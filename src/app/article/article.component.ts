import { Component, OnInit, Renderer2 } from '@angular/core';
import { Emotion } from '../shared/emotion';
import { ArticlesService } from '../services/articles.service';
import { Article } from '../shared/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {
  counter: number;
  errMess: string;
  articles: Article[];

  constructor(private emotion: Emotion, private articlesService: ArticlesService, private renderer: Renderer2) {
    console.log(this.emotion.emo);
    this.counter=1;
   }

  ngOnInit(): void {
    this.renderer.setStyle(document.body,'background-image','url(../../assets/lava.jpg)');
    this.articlesService.getCategorizedArticles(this.emotion.emo)
    .subscribe((articles)=>this.articles=articles,
    errmess=>this.errMess=<any>errmess,()=>{console.log(this.articles)});
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
