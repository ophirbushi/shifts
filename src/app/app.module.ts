import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { RouterModule } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog'
import { ImportDialogModule } from './shared/lib/import-dialog/import-dialog.module'

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            { path: '', pathMatch: 'full', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
            { path: 'location/:institutionId', loadChildren: () => import('./location/location.module').then(m => m.LocationModule) }

        ]),
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        ImportDialogModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
