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
import { VarDirective } from './directives/highlight.directive';
import { EmotificationComponent } from './emotification/emotification.component';
import { ArticleComponent } from './article/article.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommunityComponent } from './community/community.component';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { MatListModule } from '@angular/material/list';
import {ReactiveFormsModule} from '@angular/forms';
import { ArticlesService } from './services/articles.service';
import { ProcesshttpmsgService } from './services/processhttpmsg.service';
import {UserService} from './services/user.service';
import { Emotion } from './shared/emotion';
import {CommunityService} from './services/community.service';
import { ProfileComponent } from './profile/profile.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { CtyPostComponent } from './cty-post/cty-post.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { UnauthorizedInterceptor } from './services/auth.interceptor';
import { RhomeComponent } from './rhome/rhome.component';
import { AuthguardService } from './services/authguard.service';
import { LikesService } from './services/likes.service';
import { MatProgressSpinnerModule } from'@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarouselComponent,
    FooterComponent,
    AboutComponent,
    ToolbarComponent,
    STileComponent,
    VarDirective,
    EmotificationComponent,
    ArticleComponent,
    CommunityComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    UserEditComponent,
    CtyPostComponent,
    RhomeComponent
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
    NgbModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    FormsModule,
    MatListModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    ArticlesService,
    ProcesshttpmsgService,
    Emotion,
    UserService,
    CommunityService,
    AuthguardService,
    AuthService,
    LikesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: [
    CarouselComponent,
    ArticleComponent,
    LoginComponent,
    SignupComponent,
    CtyPostComponent,
    UserEditComponent
  ],
  entryComponents: [
    LoginComponent,
    SignupComponent,
    CtyPostComponent,
    UserEditComponent
  ]
})
export class AppModule { }
