import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ImportDialogComponent } from './import-dialog.component'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormsModule } from '@angular/forms'



@NgModule({
    declarations: [
        ImportDialogComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule
    ]
})
export class ImportDialogModule { }
