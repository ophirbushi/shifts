import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ImportDialogComponent } from './shared/lib/import-dialog/import-dialog.component'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private dialog: MatDialog) { }

    openImportDialog() {
        this.dialog.open(ImportDialogComponent)
    }
}
