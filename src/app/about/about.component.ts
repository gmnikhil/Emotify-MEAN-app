import { Component, OnInit, Renderer2 } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  header: string;
  desc: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private renderer: Renderer2) {
    this.renderer.setStyle(document.body,'background','white');
   }

  ngOnInit(): void {
  }
  tiles: Tile[] = [
    {header: 'Nikhil George Mathew', desc:'as Dr Trevor Reed', cols: 4, rows: 2, color: 'lightblue'},
    {header: 'www.wikipedia.org',desc:'as Dr Wiki Worldio', cols: 4, rows: 2, color: 'lightgreen'},
  ];
}

