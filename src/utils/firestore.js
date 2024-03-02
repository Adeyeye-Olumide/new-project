


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {GoogleAuthProvider,
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth'

import {
  getFirestore, 
  doc, 
  getDoc, 
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs, 
  updateDoc, 
  arrayUnion,
  onSnapshot
} from 'firebase/firestore'
import { useContext } from "react";
import { HeaderContext } from "../contexts/header-context";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0P8bOZGteMX6jDzGkvqwNOaNiFd7Qe8k",
  authDomain: "hotel-app-a8867.firebaseapp.com",
  projectId: "hotel-app-a8867",
  storageBucket: "hotel-app-a8867.appspot.com",
  messagingSenderId: "2904475340",
  appId: "1:2904475340:web:858fc1664d29616be16469"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth()



const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: 'select_account'
})

export const signInWithGooglePopUp = ()=> signInWithPopup(auth, provider)

const db = getFirestore(app)






export const addCollectionAndDocs = async(collectionKey, objectsData) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectsData.forEach(object => {

    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })

  await batch.commit()
  console.log('done')
}


export const getDataFromDb = async (string='rooms') => {

  try {

    const collectionRef = collection(db, string)


    const q = query(collectionRef)

    

    const querySnapShot = await getDocs(q)

    

    const roomsItems = querySnapShot.docs.reduce((acc, docSnapShot)=> {
      const {title, data} = docSnapShot.data()

      acc[title.toLowerCase()] = data

      return acc
    }, {})

    if(!roomsItems.rooms) throw new Error("no network")

   



  return roomsItems
    
  } 
  catch (error) {

    return error

    
  }
  
}

export const createUserDoc = async(userID, added ={}) => {
  const userDoc = doc(db, 'users', userID.uid)
  


  try {

    const userSnapShot = await getDoc(userDoc)

  

    if (!userSnapShot.exists()){
    const { displayName, email} = userID

    const createdAt = new Date()

    const result = await setDoc(userDoc, {
      displayName,
      email,
      createdAt,
      bookings:[],
      ...added
    })



    

    alert('Sign up successful')



    }
  }
  

  
  catch (error) {

   

  

    

    
  }

  return userDoc


  
}

export const update = async (data, string = 'rooms')=>{

  const collectionRef = doc(db, 'rooms', string)
  console.log(collectionRef)

  if(string == 'rooms'){
    await updateDoc(collectionRef, {data})

    return console.log("done")

  }

  else {
    await updateDoc(collectionRef, {
      data: arrayUnion(data)
    })

    return 
 }

 
 

}

export const reviewsListener = (setDatafunc)=> {


  try {

    const unsub = onSnapshot(doc(db, 'rooms', 'reviews'),
    {includeMetadataChanges: true},

    (reviewsDoc)=> {
      setDatafunc(reviewsDoc.data()?.data)
      
    }
  
  )

  return unsub
    
  } 
  catch (error) {

    // throw new Error(error)
    
  }
  

}

export async function genericSignIn(email, password){

  return signInWithEmailAndPassword(auth, email, password)

}

export async function genericSignUp(email, password){

  if (!email || !password) return alert('input a valid email and password')

  return createUserWithEmailAndPassword(auth, email, password)
}

export function authStateListener(callback){
  return onAuthStateChanged(auth, callback)
}

export function signUserOut(){
  return signOut(auth)
}




