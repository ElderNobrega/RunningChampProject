import  * as fb from 'firebase'
import {toast} from '../helperFunctions/toast';

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

var db = fb.firestore()

export function logOutUser() {
    return fb.auth().signOut()
}

export function getCurrentUser() {
    return new Promise((resolve, reject) =>{
        const unsubscribe = fb.auth().onAuthStateChanged(function(user){
            if (user) {
                resolve(user)
            } else {
                resolve(null)
            }
            unsubscribe()
        })
    })
}

export async function loginUser(username: string, password: string) {
    // Authentication with firebase
    // if present, show home
    //if not, show error msg 
    const email = `${username}`

    try{
        const res = await fb.auth().signInWithEmailAndPassword(email, password)
        return res
    } catch (error) {
        toast(error.message)
        return false
    }
    
}

export async function registerUser(eMail: string, password: string, fName: string, lName: string, 
                                   userName: string, phoneNum: string) {
    const email = `${eMail}`
        
    try {
        const res = await fb.auth().createUserWithEmailAndPassword(email, password)
        if (res.user !== null) {          
            const docRef = db.collection("User/").doc(res.user.uid)
            docRef.set({
                userID: res.user.uid,
                email: eMail,
                firstName: fName,
                lastName: lName,
                userName: userName,
                phoneNumber: phoneNum
            })
        }

        console.log(res)
        return true
    } catch (error) {
        toast(error.message)
        return false
    }
}