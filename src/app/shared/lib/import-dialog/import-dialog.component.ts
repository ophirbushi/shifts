/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { ExcelService } from '../../excel.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
    selector: 'app-import-dialog',
    templateUrl: './import-dialog.component.html',
    styleUrls: ['./import-dialog.component.scss']
})
export class ImportDialogComponent {

    constructor(
        private excel: ExcelService,
        private dialog: MatDialogRef<any>,
        private snackbar: MatSnackBar
    ) { }

    async onFileSelected(type: 'volunteers' | 'institutions', inputFile: HTMLInputElement) {
        if (type === 'volunteers') {
            try {
                await this.excel.importVolunteers(inputFile)
                this.snackbar.open('הקןבץ נקלט בהצלחה.', 'אישור', { duration: 4 * 1000 })
            } catch (err) {
                this.snackbar.open('קרתה תקלה.', 'אישור')
            }
        }
        if (type === 'institutions') {
            try {
                await this.excel.importInstitutions(inputFile)
                this.snackbar.open('הקןבץ נקלט בהצלחה.', 'אישור', { duration: 4 * 1000 })
            } catch (err) {
                this.snackbar.open('קרתה תקלה.', 'אישור')
            }
        }
        this.dialog.close()
    }

}
