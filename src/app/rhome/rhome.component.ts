import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { rhome } from '../animations/app.animations';
import {URL} from '../shared/url';
@Component({
  selector: 'app-rhome',
  templateUrl: './rhome.component.html',
  styleUrls: ['./rhome.component.css'],
  animations: [
    rhome()
  ]
})
export class RhomeComponent implements OnInit {
username: string;
bool: boolean;
url = URL;
errMess: string;
  constructor(private renderer: Renderer2, private authService: AuthService) { 
    this.bool = false;
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user=>{
      this.username=user.username;
        this.bool = true;
      let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 20); // how far to scroll on each step
          } 
        else {
            window.clearInterval(scrollToTop);
          }
      }, 16);
    },err=>this.errMess="Oops... Something went wrong!");
    this.renderer.setStyle(document.body,'background-color','rgb(256, 230, 256)');
  }

}
