import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Emotion } from '../shared/emotion';

export interface em {
  letter: string;
}

@Component({
  selector: 'app-emotification',
  templateUrl: './emotification.component.html',
  styleUrls: ['./emotification.component.css']
})
export class EmotificationComponent implements OnInit {
  ems :em[] = [
    { letter: 'E' },
    { letter: 'M' },
    { letter: 'O' },
    { letter: 'T' },
    { letter: 'I' },
    { letter: 'F' },
    { letter: 'Y' }
  ];
  subscription: Subscription;

  constructor(private router: Router, private authService: AuthService,
    private emotion: Emotion) { }

  ngOnInit(): void {
    this.authService.loadUserCredentials();
    this.subscription=this.authService.getUserId().subscribe(_id=>{console.log(_id);this.emotion.userId=_id});
  }

getDivStyle() {
  if(this.router.url==='/home')
    return 'homed';
  if(this.router.url==='/profile')
    return 'homed';
  else if(this.router.url==='/article')
    return 'articled';
  else if(this.router.url==='/community')
    return 'communityd';
  }
  getButtonStyle() {
  if(this.router.url==='/home')
    return 'homeb';
  if(this.router.url==='/profile')
    return 'homeb';
  else if(this.router.url==='/article')
    return 'articleb';
  else if(this.router.url==='/community')
    return 'communityb';
  }
}
