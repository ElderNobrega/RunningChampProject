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
    const pass = `${password}`

    try{
        const res = await fb.auth().signInWithEmailAndPassword(email, pass)
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

export async function createCompetition(name: string, fee: number, compType: string, minRange: number, maxRange: number, 
                                        sDate: Date, eDate: Date, desc: string) {
    try {
        const res = await db.collection("Competition/")
        res.add({
            name: name,
            fee: fee,
            competitionType: compType,
            minRange: minRange,
            maxRange: maxRange,
            startDate: sDate,
            endDate: eDate,
            description: desc,
            entrants: 0
        })
        return true
    } catch (error) {
        toast(error.message)
        return false
    }
}

/* function renderComp(doc:any) {
    //{compName: "Competition Name", fee: 10, minKm: "8", maxKm: "10", entrants: 41}
    console.log(doc.data().name)
    const comp = {compId: doc.id,compName: doc.data().name, fee: doc.data().fee, minKm: doc.data().minRange, maxKm: doc.data().maxRange, entrants: doc.data().entrants}
    const comps = [{}]
    comps.push(comp)
    return comps
} */

//user enroll in a comp/team (true/false or comp/team id)??? => Redux 

export async function getCompetitions() {
    const comps: Array<any> = [{}]
    db.collection('Competition').get().then(function(querySnapshot) {
        querySnapshot.docs.forEach(function(doc) {
            const comp = doc.data()
            comp["compId"] = doc.id
            comps.push(comp)
        })
    })
    return comps
}

export async function trackRun(name: string, duration: number, distance: number, date: string) {
    getCurrentUser().then((user: any) => {
        //check if the user is logged and get the id
        if (user) {
            try {
                const res = db.collection('run').doc(user.userID).collection('userRuns').doc(date)
                res.set({
                    name: name,
                    duration: duration,
                    distance: distance,
                    date: date
                })
                return true
            } catch (error) {
                toast(error.message)
                return false
            }
        }
    })
}

export async function getRun() {
    getCurrentUser().then((user: any) => {
        const docs: Array<any> = []
        if (user) {
            try {
                db.collection('run').doc(user.userID).collection('userRuns').get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        docs.push(doc.id, doc.data())
                    })
                })
                return docs
            } catch (error) {
                toast(error.message)
                return false
            }
        }
    })
    
    
}

