import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProcesshttpmsgService } from './processhttpmsg.service';
import { URL } from '../shared/url';
import { Post } from '../shared/post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor( private ProcessHTTPMsgService: ProcesshttpmsgService, private http: HttpClient) { }

  getPosts() : Observable<Post[]> {
    return this.http.get<Post[]>(URL + 'community').pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }
  getCategorizedPost(cat: string) : Observable<Post[]> {
    return this.http.get<Post[]>(URL + 'community?category='+cat).pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }
  getUsersPosts(userid :string) : Observable<Post[]> {
    return this.http.get<Post[]>(URL+'community?userid='+userid).pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }
  communityPost(post :Post) : Observable<Post> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.post<Post>(URL+'community',post,httpOptions).pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }
}
