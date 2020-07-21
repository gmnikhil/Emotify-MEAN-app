import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from "@angular/platform-browser";
import {URL} from '../shared/url';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('twitter',
    this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/twitter.svg')
    );
    this.matIconRegistry.addSvgIcon('facebook',
    this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/facebook.svg')
    );
    this.matIconRegistry.addSvgIcon('instagram',
    this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/instagram.svg')
    );
    this.matIconRegistry.addSvgIcon('reddit',
    this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/reddit.svg')
    );
   
  }
  
  ngOnInit(): void {
  }

}
