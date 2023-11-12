import { APP_INITIALIZER, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { RouterModule } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog'
import { ImportDialogModule } from './shared/lib/import-dialog/import-dialog.module'
import { FirebaseOptions, initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { getDatabase, provideDatabase } from '@angular/fire/database'
import { appInit } from './app.init'
import { StateService } from './shared/state.service'

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
        ImportDialogModule,
        provideFirebaseApp(() => initializeApp({
            projectId: 'movie-recommendation-sys',
            appId: '1:54517771672:web:57e2f58fd4656483574fed',
            databaseURL: 'https://movie-recommendation-sys.firebaseio.com',
            storageBucket: 'movie-recommendation-sys.appspot.com',
            locationId: 'us-central',
            apiKey: 'AIzaSyDKWONSTgeEHLpqFMTUuMSvBPlM88PWtIM',
            authDomain: 'movie-recommendation-sys.firebaseapp.com',
            messagingSenderId: '54517771672'
        } as FirebaseOptions)),
        provideDatabase(() => getDatabase())
    ],
    providers: [
        { provide: APP_INITIALIZER, multi: true, useFactory: appInit, deps: [StateService] }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
