import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  bool :boolean
  constructor(public activeModal: NgbActiveModal, private authService: AuthService) { 
      this.bool=true;
    }

  ngOnInit(): void {
  }
  onSubmit() {
    this.bool=false;
    this.authService.logIn(this.user)
      .subscribe(res => {
        if(res.success) {
            this.authService.getUserId().subscribe(id=>{
              this.bool=true;
              this.activeModal.close('Close click');
            },
            err=> {
              this.errMess="Try again";
              this.bool=true;
            });
            
        } else {
          this.bool=true;
          this.errMess="Authorization denied";
        }
      },
      error => {
        this.bool=true;
        this.errMess="Authorization denied";
      });
  }
       
      
}
