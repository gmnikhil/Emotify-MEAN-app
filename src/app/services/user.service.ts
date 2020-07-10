import { Injectable, ɵConsole } from '@angular/core';
import { ProcesshttpmsgService } from './processhttpmsg.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { URL } from '../shared/url';
import { User } from '../shared/user';
import { AuthResponse } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private processHttpMsgService: ProcesshttpmsgService, private http: HttpClient) { }
  getUserWithUsername(username :string): Observable<User> {
    return this.http.get<User>(URL+'users?username='+username).pipe(catchError(this.processHttpMsgService.handleError));
  }
  getUserWithId(id :string) : Observable<User> {
    return this.http.get<User>(URL+'users?_id='+id).pipe(catchError(this.processHttpMsgService.handleError));
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(URL+'users').pipe(catchError(this.processHttpMsgService.handleError));
  }
  postUser(user:User): Observable<AuthResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.post<AuthResponse>(URL+'users',user,httpOptions).pipe(catchError(this.processHttpMsgService.handleError));
  }
  editUser(user :User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.put<User>(URL+'users',user,httpOptions).pipe(catchError(this.processHttpMsgService.handleError));
  }
 
}
