import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProcesshttpmsgService } from './processhttpmsg.service';
import { URL } from '../shared/url';
import { UserService } from'../services/user.service';
import { Emotion } from '../shared/emotion';
import { Router } from '@angular/router';
import { User } from '../shared/user';

export interface AuthResponse {
  status: string;
  success: string;
  token: string;
}
interface JWTresponse {
  status: string;
  success: string;
  user: any;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenKey = 'JWT';
  isAuthenticated: Boolean = false;
  userid: Subject<string> = new Subject<string>();
  user: Subject<User> = new Subject<User>();
  authToken: string = undefined;

  constructor(private http: HttpClient, private processHTTPmsgService: ProcesshttpmsgService,
    private userService: UserService, private emotion: Emotion, private router: Router) {   }

  checkJWTtoken() {
    this.http.get<JWTresponse>(URL+'api/users/checkJWTtoken').subscribe(res=>{
      this.sendUserId(this.emotion.userId);
      this.sendUser(res.user);
    },err=>{
      this.destroyUserCredentials();
    });
  }
  sendUserId(_id: string) {
    this.userid.next(_id);
  }
  sendUser(u :User) {
    this.user.next(u);
  }
  clearUserId() {
    this.userid.next(undefined);
  }
  clearUser() {
    this.user.next(undefined);
  }
  loadUserCredentials() {
    const credentials = JSON.parse(localStorage.getItem(this.tokenKey));
    if(credentials && credentials._id!==undefined && credentials.user!=undefined) {
      this.useCredentials(credentials);
      if (this.authToken) {
        this.checkJWTtoken();
      }
    }
  }
 
  storeUserCredentials(credentials: any) {
    localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
    this.useCredentials(credentials);
  }
  useCredentials(credentials: any) {
    this.isAuthenticated = true;
    this.sendUserId(credentials._id);
    this.sendUser(credentials.user);
    this.authToken = credentials.token;
    this.emotion.userId = credentials._id;
  }
  destroyUserCredentials() {
    this.authToken = undefined;
    this.clearUserId();
    this.clearUser();
    this.isAuthenticated = false;
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['home']);
    location.reload();
  }
  logIn(user: any): Observable<any> {
    return this.http.post<AuthResponse>(URL + 'api/users/login',{'username':user.username, 'password': user.password})
    .pipe(map(res=>{
      this.userService.getUserWithUsername(user.username).subscribe(user=>{
        this.emotion.userId=user[0]._id;
        this.storeUserCredentials({
          _id: this.emotion.userId, token:res.token, user:user[0]
        });
        this.loadUserCredentials();
        this.router.navigate(['ehome']);
      },err=>alert("Error"));
      
    return {'success':true, 'username': user.username };
  }),catchError(error=>this.processHTTPmsgService.handleError(error)));
  }
  logOut() {
    this.destroyUserCredentials();
  }
  isLoggedIn(): Boolean {
    return this.isAuthenticated;
  }
  getUserId(): Observable<string> {
    return this.userid.asObservable();
  }
  getToken(): string {
    return this.authToken;
  }
  getUser(): Observable<User> {
    return this.user.asObservable();
  }
  storeUser(user) {
    this.storeUserCredentials({
      _id:user._id,token:this.authToken,user:user
    });
  }
}
