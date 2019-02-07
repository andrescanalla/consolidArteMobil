// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Initialize Firebase
  firebase : {
    apiKey: 'AIzaSyAWGOr2ByY00IX1Nr70JKJ7dyThMtJSU5k',
    authDomain: 'inspeccionarte-bb8d0.firebaseapp.com',
    databaseURL: 'https://inspeccionarte-bb8d0.firebaseio.com',
    projectId: 'inspeccionarte-bb8d0',
    storageBucket: 'inspeccionarte-bb8d0.appspot.com',
    messagingSenderId: '201075233956'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
