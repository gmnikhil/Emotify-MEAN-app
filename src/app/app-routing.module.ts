import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {STileComponent} from './s-tile/s-tile.component';

import {CommunityComponent} from './community/community.component';
import {ProfileComponent} from './profile/profile.component';
import {RhomeComponent} from './rhome/rhome.component';
import { AuthguardService} from './services/authguard.service';

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
  path:'ehome', component: RhomeComponent  , canActivate: [AuthguardService]
  },
  {
    path:'tiles', component: STileComponent  , canActivate: [AuthguardService]
  },
  {
  path:'community', component: CommunityComponent  , canActivate: [AuthguardService]
  },
  {
  path:'profile', component: ProfileComponent   , canActivate: [AuthguardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
