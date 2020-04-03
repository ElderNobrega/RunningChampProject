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
                phoneNumber: phoneNum,
                distance: 0,
                runs: 0,
                onTeam: false
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
        const res = await db.collection("Competition")
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

//user enroll in a comp/team (true/false or comp/team id)??? => Redux 

export async function getCompetition(id: string) {
    let competition: Array<any> = []
    if (id) {
        try {
            var docRef = db.collection('Competition').doc(id)
            await docRef.get().then(function(doc) {
                if (doc.exists) {
                    const comp = doc.data()
                    competition.push(comp)
                }
            })
        } catch (error) {
            toast(error.message)
            return false
        }
    }
    console.log(competition)
    return competition
}

export async function getCompetitions() {
    const comps: Array<any> = []
    var querySnapshot: fb.firestore.QuerySnapshot<fb.firestore.DocumentData> = await db.collection('Competition').get()
    querySnapshot.docs.forEach(function(doc) {
        const comp = doc.data()
        comp["compId"] = doc.id
        comps.push(comp)
    })
    return comps
}

export async function checkCaptain() {
    let check: boolean = false
    await getCurrentUser().then((user: any) => {
        if (user) {
            try {
                db.collection("Team").where("captain", "==", user.uid).get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        if (doc.exists) {
                            check = true
                        } else {
                            check = false
                        }
                    })
                })
            } catch (error) {
                console.log(error)
                toast(error.message)
            }
        } else {
            check = false
        }
    })
    return check
}

export async function checkDistPay(userID: string, minKm: number, maxKm: number) {
    //const teams: Array<any> = []
    let check: string = ""
    try {
        await db.collection("Team").where("captain", "==", userID).get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if (doc) {
                    const team = doc.data()
                    //teams.push(team)
                    if (!(team.teamAvgDistance >= minKm) && !(team.teamAvgDistance <= maxKm)) {
                        check += "The team is not in between the minimum and maximum average range for this competition"
                    }
                    //Verify payments
                   /*  var querySnapshot = db.collection("Team").doc(userID).collection("member").get()
                    querySnapshot.forEach(function) */
                } else {
                    check = "There is no such a team with this captain."
                }
                /* if (!(teams[0].teamAvgDistance >= minKm) && !(teams[0].teamAvgDistance <= maxKm)) {
                    check += "The team is not in between the minimum and maximum range for this competition"
                } */
            })
        })
    } catch (error) {
        toast(error.message)
        console.log(error)
    }
    return check
}

//update entrants in comp
export async function joinComp(compID: string) {
    let competition: Array<any> = []
    let teamData: Array<any> = []
    await getCurrentUser().then((user: any) => {
        if (user && compID) {
            try {
                const res = db.collection("Comp_Team/").doc(user.uid)
                var docRef = db.collection('Competition').doc(compID)
                const teamRef = db.collection("Team").doc(user.uid)
                const team = db.collection("Team").where("captain", "==", user.uid)
                docRef.get().then(function(doc) {
                if (doc.exists) {
                    const comp = doc.data()
                    competition.push(comp)
                }
            })
                checkDistPay(user.uid, competition[0].minRange, competition[0].maxRange).then((check) => {
                    if (check == "") {
                        team.get().then(function(querySnapshot)  {
                            querySnapshot.docs.forEach(function(doc) {
                                teamData.push(doc.data()) 
                            })
                        })
                        res.set({
                            tName: teamData[0].teamName,
                            distance: teamData[0].teamDistance,
                            compID: compID,
                            compRef: docRef,
                            teamRef: teamRef
                        })
                    }
                })
            } catch {

            }
        }
    })
}

//fix get userName => get data from Users docRef reference
export async function createTeam(name: string) {
    let cap: Array<any> = []
    await getCurrentUser().then((user: any) => {
        if (user) {
            try {
                const docRef = db.collection("User").doc(user.uid)
                docRef.get().then(function(doc) {
                    cap.push(doc.data())
                })
                if (!cap[0].onTeam) {
                const username = cap[0].userName
                const res = db.collection("Team")
                res.add({
                    teamName: name,
                    captain: user.uid,
                    username: {
                                userId: user.uid,
                                distance: cap[0].distance / cap[0].runs,
                                payment: false,
                                docRef: docRef,
                            },
                    teamAvgDistance: cap[0].distance / cap[0].runs,
                    onComp: false
                })
                docRef.update({
                    onTeam: true
                })
            }
            } catch (error) {
                toast(error.message)
                console.log(error)
            }
        }
    })
}

export async function trackRun(name: string, duration: number, distance: number, date: string) {
    getCurrentUser().then((user: any) => {
        //check if the user is logged and get the id
        if (user) {
            try {
                const res = db.collection('run').doc(user.uid).collection('userRuns').doc(date)
                res.set({
                    teamName: name,
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

export async function getRuns() {
    getCurrentUser().then((user: any) => {
        const docs: Array<any> = []
        if (user) {
            try {
                db.collection('run').doc(user.uid).collection('userRuns').get().then(function(querySnapshot) {
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

