import { Component } from '@angular/core';

import { ServiceAuth } from './service-auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div class='container'>
        
        <div class='panel panel-primary'>
        
            <div class='panel-heading' style="overflow: hidden;">
                <a [routerLink]="['']" style="color:white;text-decoration:none;float: left;">
                    {{pageTitle}}
                </a>
                <button class="btn btn-primary btn-margin" style="float: right;" (click)="serviceauth.login()" *ngIf="!serviceauth.authenticated()">Log In</button>
                <button class="btn btn-primary btn-margin" style="float: right;" (click)="serviceauth.logout()" *ngIf="serviceauth.authenticated() && serviceauth.userProfile">Log Out {{serviceauth.userProfile.nickname}}</button>
                <button class="btn btn-primary btn-margin" style="float: right;" (click)="serviceauth.logout()" *ngIf="serviceauth.authenticated() && !serviceauth.userProfile">Log Out </button>
            </div>
            
            <div >
                <router-outlet></router-outlet>
            </div>                           
            
        </div>
    </div>
  ` 
})
export class AppComponent  { 
  pageTitle: string = 'Event Recorder'; 

  constructor (private serviceauth: ServiceAuth) {

  }
}
