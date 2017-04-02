// Angular Modules
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

// App Components, filters, services and models
import { AppComponent }  from './app.component';
import { ServiceAuth } from './service-auth.service';

// Modules
import { EventModule } from './events/event.module';

@NgModule({
  imports:      [ 
    BrowserModule,
    RouterModule.forRoot([
    ]),
    EventModule
  ],
  declarations: [ 
    AppComponent
  ],
  bootstrap:    [ 
    AppComponent 
  ],
  providers: [
    ServiceAuth
  ]
})
export class AppModule { }
