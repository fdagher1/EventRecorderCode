// Angular Modules
import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [ 
    CommonModule,
    HttpModule
    ],
  exports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ ],
})
export class SharedModule { }