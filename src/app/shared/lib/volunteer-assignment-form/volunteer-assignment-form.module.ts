import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { VolunteerAssignmentFormComponent } from './volunteer-assignment-form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBarModule } from '@angular/material/snack-bar'

@NgModule({
    declarations: [
        VolunteerAssignmentFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatSnackBarModule
    ],
    exports: [
        VolunteerAssignmentFormComponent
    ]
})
export class VolunteerAssignmentFormModule { }
