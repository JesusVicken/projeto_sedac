import { initializeApp } from "firebase/app";
import {initializeFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDga0d0aVrRx2xCo9PmfRz1OiaGOy9Ju2U",
    authDomain: "projetosedac.firebaseapp.com",
    projectId: "projetosedac",
    storageBucket: "projetosedac.appspot.com",
    messagingSenderId: "267853272029",
    appId: "1:267853272029:web:f39bbc11f6e495e5981c34",
    measurementId: '',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});

export { db, auth };   // exportando o BD e a autenticação