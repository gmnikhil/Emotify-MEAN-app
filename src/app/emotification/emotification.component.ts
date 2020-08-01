import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

getDivStyle() {
  return 'homed';
  }
  getButtonStyle() {
    return 'homeb';
  }
}
