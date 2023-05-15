import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDga0d0aVrRx2xCo9PmfRz1OiaGOy9Ju2U",
    authDomain: "projetosedac.firebaseapp.com",
    projectId: "projetosedac",
    storageBucket: "projetosedac.appspot.com",
    messagingSenderId: "267853272029",
    appId: "1:267853272029:web:f39bbc11f6e495e5981c34"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };   // exportando o banco de dados