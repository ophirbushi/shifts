import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home.component'
import { RouterModule } from '@angular/router'
import { MatCardModule } from '@angular/material/card'
import { VolunteerAssignmentFormModule } from '../shared/lib/volunteer-assignment-form/volunteer-assignment-form.module'



@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: HomeComponent }]),
        MatCardModule,
        VolunteerAssignmentFormModule
    ]
})
export class HomeModule { }
