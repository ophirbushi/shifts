import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'



// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDKWONSTgeEHLpqFMTUuMSvBPlM88PWtIM',
  authDomain: 'movie-recommendation-sys.firebaseapp.com',
  databaseURL: 'https://movie-recommendation-sys.firebaseio.com',
  projectId: 'movie-recommendation-sys',
  storageBucket: 'movie-recommendation-sys.appspot.com',
  messagingSenderId: '54517771672',
  appId: '1:54517771672:web:57e2f58fd4656483574fed'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
app.automaticDataCollectionEnabled = false

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err))


