import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder,FormGroup,Validators, FormControl, Form} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {User} from '../shared/user';
import{ UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Emotion } from '../shared/emotion';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User;
  errMess: string;
  signupForm: FormGroup;
  passForm: FormGroup;
  username: FormControl;
  password: FormControl;
  confirmpassword: FormControl;
  name: FormControl;
  email: FormControl;

  @ViewChild("sform") signupFormDirective;
  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal,
    private authService: AuthService, private userService: UserService, private router: Router,
    private emotion: Emotion) {
    this.createFormControls();
    this.createForm();
   }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users=>console.log(users));
  }
  createFormControls() {
    this.username = new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(25),Validators.pattern("[a-zA-Z0-9_]{4,25}")]);
    this.password = new FormControl('',[Validators.required,Validators.minLength(6)]);
    this.confirmpassword = new FormControl('',[Validators.required],);
    this.email = new FormControl('',[Validators.required,Validators.email]);
    this.name = new FormControl('',[Validators.required]);
  }
  createForm() {
    this.signupForm=this.fb.group({
      username: this.username,
      password: this.password,
      confirmpassword: this.confirmpassword,
      name: this.name,
      email: this.email
    }, {validator: this.checkPassword});

    this.passForm=this.fb.group({
      username: this.username,
      password: this.password,
      name: this.name,
      email:this.email,
      _id: [""]
    });
  }
  checkPassword(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmpassword').value;

    if(pass===confirmPass) {
      return null;
    } 
    else {
      return {  'wrong' : true   };
    }    
  }
  
  onSubmit() {
    this.passForm.value.email = this.signupForm.value.email;
    this.passForm.value.username = this.signupForm.value.username;
    this.passForm.value.password = this.signupForm.value.password;
    this.passForm.value.name = this.signupForm.value.name; 
    this.userService.postUser(this.passForm.value).subscribe((user)=>{
    if(user.success) {
      this.userService.getUserWithUsername(this.passForm.value.username).subscribe(usr=>{
        console.log(usr);
        this.emotion.userId = usr[0]._id;
        this.authService.storeUserCredentials({_id:this.emotion.userId, token:user.token});
      },err=>{
        this.errMess=err
      });
    }
    if(!this.errMess) {
      this.router.navigate(['ehome']);
      this.activeModal.close('Close click');
    }
  });
    this.signupFormDirective.resetForm();    
    this.signupForm.reset({
      username:"",
      password:"",
      confirmpassword:"",
      name:"",
      email:""
    });
  }
}
