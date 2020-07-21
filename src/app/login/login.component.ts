import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {Emotion} from '../shared/emotion';
import { AuthService } from '../services/auth.service';

export interface loguser {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user: loguser = {username:"",password:""};
  errMess: string;
  constructor(public activeModal: NgbActiveModal, private userService: UserService, 
    private router: Router, private emotion: Emotion, private authService: AuthService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.authService.logIn(this.user)
      .subscribe(res => {
        if(res.success) {
            this.authService.getUserId().subscribe(id=>{
              this.activeModal.close('Close click');
            },
            err=>this.errMess="Try again");
            
        } else {
          this.errMess="Authorization denied";
        }
      },
      error => {
        this.errMess="Authorization denied";
      });
  }
       
      
}
