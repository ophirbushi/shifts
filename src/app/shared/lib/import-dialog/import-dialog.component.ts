/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { ExcelService } from '../../excel.service'

@Component({
    selector: 'app-import-dialog',
    templateUrl: './import-dialog.component.html',
    styleUrls: ['./import-dialog.component.scss']
})
export class ImportDialogComponent {

    constructor(
        private excel: ExcelService,
        private dialog: MatDialogRef<any>
    ) { }

    async onFileSelected(type: 'volunteers' | 'institutions', inputFile: HTMLInputElement) {
        if (type === 'volunteers') {
            await this.excel.importVolunteers(inputFile)
        }
        if (type === 'institutions') {
            await this.excel.importInstitutions(inputFile)
        }
        this.dialog.close()
    }

}
