import * as fb from 'firebase'
import {toast} from '../helperFunctions/toast';

//var db = fb.database();

const config = {

    /*

        <!-- The core Firebase JS SDK is always required and must be listed first -->
        <script src="https://www.gstatic.com/firebasejs/7.8.1/firebase-app.js"></script>

        <!-- TODO: Add SDKs for Firebase products that you want to use
        https://firebase.google.com/docs/web/setup#available-libraries -->
        <script src="https://www.gstatic.com/firebasejs/7.8.1/firebase-analytics.js"></script>
    */
    apiKey: "AIzaSyAgLMcPKBRwnknPS7Zefx-ZFIWGUQQwF9s",
    authDomain: "running-champions-96792.firebaseapp.com",
    databaseURL: "https://running-champions-96792.firebaseio.com",
    projectId: "running-champions-96792",
    storageBucket: "running-champions-96792.appspot.com",
    messagingSenderId: "441831629749",
    appId: "1:441831629749:web:832fc033dec8d93a58affc",
    measurementId: "G-X9XPTWBRMY"
}

fb.initializeApp(config)
//firebase.analytics();

export async function loginUser(username: string, password: string) {
    // Authentication with firebase
    // if present, show home
    //if not, show error msg 
    
    const email = `${username}`

    try{
        const res = await fb.auth().signInWithEmailAndPassword(email, password)
        console.log(res)
        return true
    } catch (error) {
        toast(error.message)
        return false
    }
    
}

export async function registerUser(username: string, password: string) {
    const email = `${username}`
    try {
        const res = await fb.auth().createUserWithEmailAndPassword(email, password)
        console.log(res)
        return true
    } catch (error) {
        toast(error.message)
        return false
    }
}