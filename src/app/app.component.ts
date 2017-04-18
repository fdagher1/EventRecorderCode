import { Component } from '@angular/core';

import { ServiceAuth } from './service-auth.service';

@Component({
  selector: 'app-root',
  template: `

        
        <div class='panel panel-primary'>
        
            <div class='panel-heading' style="position: fixed; width: 100%; height: 40px; margin-top: 0px; z-index: 1;">
                <a [routerLink]="['']" style="color:white;text-decoration:none;margin: 20;"> {{pageTitle}} </a>

                <button class="btn btn-default btn-xs" style="float: right;" (click)="serviceauth.login()" *ngIf="!serviceauth.authenticated()">Log In</button>
                <button class="btn btn-default btn-xs" style="float: right;" (click)="serviceauth.logout()" *ngIf="serviceauth.authenticated() && serviceauth.userProfile">Log Out {{serviceauth.userProfile.nickname}}</button>
                <button class="btn btn-default btn-xs" style="float: right;" (click)="serviceauth.logout()" *ngIf="serviceauth.authenticated() && !serviceauth.userProfile">Log Out </button>
               
            </div>                           
            
            <<div style="margin-top: 20px; z-index: -1">
              <router-outlet></router-outlet>
            </div>

        </div>

  ` 
})
export class AppComponent  { 
  pageTitle: string = 'Event Recorder'; 

  constructor (private serviceauth: ServiceAuth) {

  }
}
