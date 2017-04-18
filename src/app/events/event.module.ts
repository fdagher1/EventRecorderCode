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

@NgModule ({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {path: '', component: EventEditComponent },
            {path: 'eventlist', component: EventListComponent},
            {path: 'eventedit/:id', component: EventEditComponent},
            {path: '**', component: EventListComponent }
        ]),
        InMemoryWebApiModule.forRoot(DataEvent)
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