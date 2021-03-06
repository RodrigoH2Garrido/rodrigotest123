import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
const firebaseConfig = {
    apiKey: "AIzaSyD_WShJ0j6A12Vt0sWL5DqBJtKPpHbQef0",
    authDomain: "spreadlogin.firebaseapp.com",
    projectId: "spreadlogin",
    storageBucket: "spreadlogin.appspot.com",
    messagingSenderId: "373326954945",
    appId: "1:373326954945:web:680cdd18da624715722f40",
    measurementId: "G-XGP60BCLRG"
};

firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


// export {
//     db,
//     googleAuthProvider,
//     firebase
// }


export const auth = firebase.auth()

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWWithGoogle = () => auth.signInWithPopup(provider);


export default firebase