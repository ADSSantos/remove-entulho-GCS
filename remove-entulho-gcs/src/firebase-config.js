// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAWJslHasVUpkA-qptmrRcxbZRnX_0mCvc",
  authDomain: "remove-entulho-gcs.firebaseapp.com",
  databaseURL: "https://remove-entulho-gcs-default-rtdb.firebaseio.com",
  projectId: "remove-entulho-gcs",
  storageBucket: "remove-entulho-gcs.appspot.com",
  messagingSenderId: "141679077790",
  appId: "1:141679077790:web:77050182de2ce7accece8f",
};



const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

