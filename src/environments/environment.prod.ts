import {firebase, captchaSite} from '../../configEnv';

export const environment = {
  production: true,
  firebaseConfig : {
    apiKey: firebase.API_KEY,
    authDomain: firebase.AUTH_DOMAIN,
    projectId: firebase.PROJECT_ID,
    storageBucket: firebase.STORAGE_BUCKET,
    messagingSenderId: firebase.MESSAGING_SENDER_ID,
    appId: firebase.APP_ID
  },
  reCaptcha:{
    siteKey: captchaSite
  },
  apiUrls: { apiUrl: "https://pacific-badlands-52387.herokuapp.com/api/v1",
            authUrl: "https://pacific-badlands-52387.herokuapp.com/auth" }
};
