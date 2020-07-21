import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {UserService} from '../services/user.service';
import {rhome} from '../animations/app.animations';
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
  constructor(private renderer: Renderer2, private authService: AuthService, private userService: UserService) { 
    this.bool = false;
  }

  ngOnInit(): void {
    this.authService.getUserId().subscribe(id=>{
      this.userService.getUserWithId(id).subscribe(user=>{
        this.username=user[0].username;
        this.bool = true;
      }),err=>this.errMess="Oops... Something went wrong!";
    },err=>this.errMess="Oops... Something went wrong!");
    this.renderer.setStyle(document.body,'background-color','rgb(256, 230, 256)');
  }

}
