import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormBuilder,FormGroup,Validators, FormControl} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';
import { Emotion } from '../shared/emotion';
import { User } from '../shared/user';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from'@angular/common/http';
import {URL} from '../shared/url';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  errMess: string;
  user: User;
  bool : boolean = false;
  userForm: FormGroup;
  passForm: FormGroup; 
  username: FormControl;
  name: FormControl;
  email: FormControl;
  subscription: Subscription;

  @ViewChild("uform") editFormDirective;
  @ViewChild('userPhoto') userPhoto: ElementRef;
  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, 
    private authService: AuthService, private emotion: Emotion,
    private http: HttpClient) { 
    
  }

  ngOnInit(): void {
            this.user=this.emotion.user;
            this.bool=true;
            this.createFormControls();
            this.createForm();
       
  }
  createFormControls() {
    this.username = new FormControl(this.user.username,[Validators.required,Validators.minLength(4),Validators.maxLength(25),Validators.pattern("[a-zA-Z0-9_]{4,25}")]);
    this.email = new FormControl(this.user.email,[Validators.required,Validators.email]);
    this.name = new FormControl(this.user.name,[Validators.required]);
  }
  createForm() {
    this.passForm=this.fb.group({
    _id: [""],
    username: [""],
    name: [""],
    email: [""],
    userImage: [""]
    });
    this.userForm=this.fb.group({
      username: this.username,
      name: this.name,
      email: this.email
    });
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const type = file.type.split('/')[1];

      if(type==="jpeg"||type==="jpg"||type==="png") {
        this.passForm.get('userImage').setValue(file);
        document.getElementById("file").className="file-input max-width";
      }
      else {
        document.getElementById("file").className="file-input min-width";
        this.userPhoto.nativeElement.value = null;
        alert("Image format not supported");
      
      }
    }
  }
    /*
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload=()=>{
        this.passForm.patchValue({userImage: reader.result});
        console.log(reader.result);   
      }
    } */
  onSubmit() {
    this.passForm.value._id = this.emotion.userId;
    this.passForm.value.username = this.userForm.value.username;
    this.passForm.value.name = this.userForm.value.name;
    this.passForm.value.email = this.userForm.value.email;

    const data = new FormData();
    if(this.passForm.value.userImage!="")
    data.append('userImage',this.passForm.get('userImage').value,this.passForm.get('userImage').value.name);
    data.append('name',this.passForm.value.name);
    data.append('username',this.passForm.value.username);
    data.append('email',this.passForm.value.email);
    data.append('_id',this.passForm.value._id);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':'application/json',
        'enctype':'multipart/form-data'
      })
    };
    this.bool=false;
    this.http.put(URL+'api/users',data,httpOptions).subscribe(
      user=>{
      this.authService.storeUser(user);
      this.bool=true;
      this.activeModal.close('Close click');
      },err=>alert("Oops! Something went wrong!"));
    
  }
}
