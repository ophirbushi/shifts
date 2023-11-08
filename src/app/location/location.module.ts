import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LocationComponent } from './location.component'
import { RouterModule } from '@angular/router'

@NgModule({
    declarations: [
        LocationComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: LocationComponent }])
    ]
})
export class LocationModule { }
