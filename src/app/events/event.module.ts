// Angular Modules
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

// Angular modules for loading & configuring the in-memory web api and Angular JWT
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

//Event module's Components, Filters, Services and Modules 
import { DataEvent }  from './data-event';
import { EventListComponent } from './eventlist.component';
import { ServiceEventData } from './service-eventdata.service';
import { PipeEventFilter } from './pipe-eventfilter.pipe';
import { EventEditComponent } from './eventedit.component';

//Modules
import { SharedModule } from '../shared/shared.module';

//Import NguiAutoCompleteModule 
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

@NgModule ({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {path: '', component: EventEditComponent },
            {path: 'edit/:id', component: EventEditComponent},
            {path: 'list', component: EventListComponent},
            {path: '**', component: EventListComponent }
        ]),
        InMemoryWebApiModule.forRoot(DataEvent),
        NguiAutoCompleteModule
    ],
    declarations: [       
        EventListComponent,
        PipeEventFilter,
        EventEditComponent
    ],
    providers: [
        ServiceEventData
    ]
})
export class EventModule {

}