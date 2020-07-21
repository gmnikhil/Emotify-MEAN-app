import { Component, OnInit, Renderer2 } from '@angular/core';
import { flyInOut,expand,revolve} from '../animations/app.animations';
import { Emotion } from '../shared/emotion';

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
  constructor(private renderer: Renderer2, private emotion: Emotion) {
    this.load = false;
  }

  ngOnInit(): void {
    this.renderer.setStyle(document.body,'background-color','indigo');
  }

  tiles: Tile[] = [
    {color: 'orange', emotion: 'Happy'},
    {color: 'grey', emotion:'Sad'},
    {color: 'crimson', emotion:'Nervous'},
    {color: 'lightblue', emotion: 'Love'},
    {color: 'black', emotion: 'Alone'},
    {color: 'violet', emotion: 'Fear'},
    {color: 'gold', emotion: 'Broken'},
    {color: 'green', emotion: 'Integrity'}
  ];
updateEmotion(emo: string) {
  this.emotion.emo = emo;
  this.load = true;
  this.renderer.setStyle(document.body,'background-color','rgb(219, 166, 217)');
  }
}
