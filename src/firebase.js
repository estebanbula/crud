import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCohbhnZGazbpewKxeJEEO_ITEqazyDz4o",
  authDomain: "crud-154bd.firebaseapp.com",
  projectId: "crud-154bd",
  storageBucket: "crud-154bd.appspot.com",
  messagingSenderId: "598550881720",
  appId: "1:598550881720:web:5dc1566b2021907c02db4d"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig)