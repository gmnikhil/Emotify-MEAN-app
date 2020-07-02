import { Component, OnInit, Renderer2 } from '@angular/core';
import { flyInOut,expand,revolve} from '../animations/app.animations';


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

  constructor(private renderer: Renderer2) {
    
  }

  ngOnInit(): void {
  }
tiles: Tile[] = [
  {color: 'orange', emotion: 'Happy'},
  {color: 'grey', emotion:'Sad'},
  {color: 'crimson', emotion:'Nervous'},
  {color: 'lightblue', emotion: 'Love'},
  {color: 'black', emotion: 'Alone'},
  {color: 'violet', emotion: 'Scared'},
  {color: 'gold', emotion: 'Broken'},
  {color: 'green', emotion: 'Integrity'}
]
}
