import { Component, OnInit,Renderer2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { URL } from '../shared/url';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  url: string;
  constructor(private renderer: Renderer2, private modalService: NgbModal) {
    this.renderer.setStyle(document.body,'background','white');
    this.url=URL;
   }

  ngOnInit(): void {
  }
  openSignup() {
    this.modalService.open(SignupComponent, { centered: true });
  }
  openLogin() {
    this.modalService.open(LoginComponent, { centered: true });
  }
}
