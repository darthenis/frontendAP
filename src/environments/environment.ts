// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { firebase } from '../../configEnv';

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: firebase.API_KEY,
    authDomain: firebase.AUTH_DOMAIN,
    projectId: firebase.PROJECT_ID,
    storageBucket: firebase.STORAGE_BUCKET,
    messagingSenderId: firebase.MESSAGING_SENDER_ID,
    appId: firebase.APP_ID
  },
  reCaptcha:{
    siteKey: "6Lcoth8gAAAAAAno_dldxYth8mhm4nMtcjQJHqlT"
  },
  apiUrls: { apiUrl: "http://localhost:8080/api/v1",
            authUrl: "http://localhost:8080/auth" }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
