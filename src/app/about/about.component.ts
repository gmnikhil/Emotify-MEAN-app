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
    {header: 'helpguide.org',desc:'cultivating-happiness', cols: 2, rows: 2, color: 'lightgreen'},
    {header: 'mentalhealth.org.uk',desc:'overcome-fear-and-anxiety', cols: 2, rows: 2, color: 'skyblue'},
    {header: 'lifehack.org.',desc:'overcome-sadness-depression', cols: 2, rows: 2, color: 'wheat'},
    {header: 'forbes.com',desc:'overcome-nervousness', cols: 2, rows: 2, color: 'aliceblue'},
    {header: 'mindtools.com',desc:'preserving-integrity', cols: 2, rows: 2, color: 'lightyellow'},
    {header: 'psychologytoday.com',desc:'lonely', cols: 2, rows: 2, color: 'violet'},
    {header: 'psychcentral.com',desc:'broken', cols: 2, rows: 2, color: 'pink'},
    {header: 'quietrev.com',desc:'love', cols: 2, rows: 2, color: 'hotpink'},
    {header: 'Nikhil George Mathew', desc:'creator', cols: 4, rows: 2, color: 'lightblue'}
  ];
}

