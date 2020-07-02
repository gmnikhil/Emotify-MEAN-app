import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import{NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './carousel/carousel.component';
import {MatCardModule} from '@angular/material/card';
import { FooterComponent } from './footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { STileComponent } from './s-tile/s-tile.component';
import { HighlightDirective } from './directives/highlight.directive';
import { EmotificationComponent } from './emotification/emotification.component';
import { ArticleComponent } from './article/article.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommunityComponent } from './community/community.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarouselComponent,
    FooterComponent,
    AboutComponent,
    ToolbarComponent,
    STileComponent,
    HighlightDirective,
    EmotificationComponent,
    ArticleComponent,
    CommunityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NgbCarouselModule,
    MatCardModule,
    HttpClientModule,
    MatGridListModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    CarouselComponent,
    ArticleComponent
  ]
})
export class AppModule { }
