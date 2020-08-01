import { Component, OnInit, Renderer2 } from '@angular/core';
import { flyInOut,expand,revolve} from '../animations/app.animations';
import { Emotion } from '../shared/emotion';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

export interface Tile {
  color: string;
  emotion: string;
}

@Component({
  selector: 'app-s-tile',
  templateUrl: './s-tile.component.html',
  styleUrls: ['./s-tile.component.css'],
  animations: [
    flyInOut(),
    expand(),
    revolve()
  ]
})
export class STileComponent implements OnInit {
  load: boolean;
  subscription: Subscription;

  constructor(private renderer: Renderer2, private emotion: Emotion, 
    private authService: AuthService) {
    this.load = false;
  }

  ngOnInit(): void {
    this.renderer.setStyle(document.body,'background-color','indigo');
    this.subscription= this.authService.getUser().subscribe(user=>this.emotion.user=user);
  }

  tiles: Tile[] = [
    {color: 'violet', emotion: 'Happy'},
    {color: 'grey', emotion:'Sad'},
    {color: 'crimson', emotion:'Nervous'},
    {color: 'lightblue', emotion: 'Love'},
    {color: 'black', emotion: 'Alone'},
    {color: 'deeppink', emotion: 'Fear'},
    {color: 'gold', emotion: 'Broken'},
    {color: 'green', emotion: 'Integrity'}
  ];
updateEmotion(emo: string) {
  this.emotion.emo = emo;
  this.load = true;
  this.renderer.setStyle(document.body,'background-color','rgb(219, 166, 217)');
  }
}
