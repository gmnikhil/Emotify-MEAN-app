import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emotification',
  templateUrl: './emotification.component.html',
  styleUrls: ['./emotification.component.css']
})
export class EmotificationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
getDivStyle() {
  if(this.router.url==='/tiles')
    return 'homed';
  else if(this.router.url==='/article')
    return 'articled';
  else if(this.router.url==='/community')
    return 'communityd';
  }
  getButtonStyle() {
  if(this.router.url==='/tiles')
    return 'homeb';
  else if(this.router.url==='/article')
    return 'articleb';
  else if(this.router.url==='/community')
    return 'communityb';
  }
}
