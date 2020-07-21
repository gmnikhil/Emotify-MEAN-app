import { Component, OnInit } from '@angular/core';
import { URL } from '../shared/url';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
  images = [12, 11, 3, 7].map((n) => URL+`/images/happy${n}.jpg`);
}
