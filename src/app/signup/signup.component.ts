import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormBuilder,FormGroup,Validators, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {User} from '../shared/user';
import{ UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Emotion } from '../shared/emotion';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
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
  users: User[];
  bool: boolean;

  @ViewChild("sform") signupFormDirective;
  @ViewChild('userPhoto') userPhoto: ElementRef;
  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal,
    private authService: AuthService, private userService: UserService, private router: Router,
    private emotion: Emotion, private http: HttpClient) {
    this.createFormControls();
    this.createForm();
    this.bool=false;
   }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users=>this.users=users,err=>location.reload());
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
      _id: [""],
      userImage: [""]
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
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const type = file.type.split('/')[1];
      if(type==="jpeg"||type==="jpg"||type==="png")
        this.passForm.get('userImage').setValue(file);
      else {
        this.userPhoto.nativeElement.value = null;
        alert("Image format not supported");
      }
    }
  }  
  onSubmit() {
    this.bool=true;
    this.passForm.value.email = this.signupForm.value.email;
    this.passForm.value.username = this.signupForm.value.username;
    this.passForm.value.password = this.signupForm.value.password;
    this.passForm.value.name = this.signupForm.value.name; 
    for(var i=0;i<this.users.length;i++) {
      if(this.passForm.value.username===this.users[i].username) {
        this.bool=false;
        alert("Username already taken");
        this.signupFormDirective.resetForm();       
        this.signupForm.reset({
          username:"",
          password:this.passForm.value.password,
          confirmpassword:this.passForm.value.confirmpassword,
          name:this.passForm.value.name,
          email:this.passForm.value.email
        });  
        return;
      }
    }
    const data = new FormData();
    if(this.passForm.value.userImage!="")
    data.append('userImage',this.passForm.get('userImage').value,this.passForm.get('userImage').value.name);
    data.append('name',this.passForm.value.name);
    data.append('username',this.passForm.value.username);
    data.append('email',this.passForm.value.email);
    data.append('password',this.passForm.value.password);

    this.userService.postUser(data).subscribe((user)=>{
    if(user.success) {
      this.userService.getUserWithUsername(this.passForm.value.username).subscribe(usr=>{
        this.emotion.userId = usr[0]._id;
        this.authService.storeUserCredentials({_id:this.emotion.userId, token:user.token});
        this.router.navigate(['ehome']);
        this.activeModal.close('Close click');
      },err=>{
        this.bool=false;
        this.errMess="Authorisation denied";
      });
    }
  },err=>{
    alert("error");
    this.bool=false;
    })
  }
}
