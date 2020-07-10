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
    console.log('User: ', this.user);
    this.authService.logIn(this.user)
      .subscribe(res => {
        if (res.success) {
          this.router.navigate(['ehome']);
          this.activeModal.close('Close click');
        } else {
          console.log(res);
        }
      },
      error => {
        console.log(error);
        this.errMess = error;
      });
  }
       
      
}
