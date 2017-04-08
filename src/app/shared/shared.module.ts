// Angular Modules
import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AboutComponent} from './about.component';

@NgModule({
  imports: [ 
    CommonModule,
    HttpModule,
    RouterModule.forChild([
            {path: 'about', component: AboutComponent }
        ]),
    ],
  exports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ 
    AboutComponent
  ],
})
export class SharedModule { }