import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {STileComponent} from './s-tile/s-tile.component';
import{ArticleComponent} from './article/article.component';
import{EmotificationComponent} from './emotification/emotification.component';
import {CommunityComponent} from './community/community.component';
import {ProfileComponent} from './profile/profile.component';
import {RhomeComponent} from './rhome/rhome.component';

const routes: Routes = [
  {
    path:'home', component: HomeComponent
  },
  {
  path:'about', component: AboutComponent
  },
  {
    path:"",redirectTo: 'home', pathMatch: 'full'
  },
  {
  path:'login', component: EmotificationComponent
  },
  {
  path:'article', component: ArticleComponent
  },
  {
  path:'ehome', component: RhomeComponent
  },
  {
    path:'tiles', component: STileComponent
  },
  {
  path:'community', component: CommunityComponent
  },
  {
  path:'profile', component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
