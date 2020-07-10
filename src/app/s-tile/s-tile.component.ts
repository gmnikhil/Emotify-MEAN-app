import { Component, OnInit, Renderer2 } from '@angular/core';
import { flyInOut,expand,revolve} from '../animations/app.animations';
import { Emotion } from '../shared/emotion';
import { Router } from '@angular/router';

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

  constructor(private renderer: Renderer2, private emotion: Emotion, private router: Router) {
    
  }

  ngOnInit(): void {
    this.renderer.setStyle(document.body,'background-image','url(../../assets/grey.jpg)')
  }
  tiles: Tile[] = [
    {color: 'orange', emotion: 'Happy'},
    {color: 'grey', emotion:'Sad'},
    {color: 'crimson', emotion:'Nervous'},
    {color: 'lightblue', emotion: 'Love'},
    {color: 'black', emotion: 'Alone'},
    {color: 'violet', emotion: 'Frightened'},
    {color: 'gold', emotion: 'Broken'},
    {color: 'green', emotion: 'Integrity'}
  ];
updateEmotion(emo: string) {
  this.emotion.emo=emo;
  this.router.navigate(['article']);
}
}
