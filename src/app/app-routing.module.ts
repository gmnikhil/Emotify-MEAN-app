import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {STileComponent} from './s-tile/s-tile.component';
import{ArticleComponent} from './article/article.component';
import{EmotificationComponent} from './emotification/emotification.component';

const routes: Routes = [
  {
    path:'home', component: EmotificationComponent
  },
  {
  path:'about', component: AboutComponent
  },
  {
    path:"",redirectTo: 'home', pathMatch: 'full'
  },
  {
  path:'login', component: ArticleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
