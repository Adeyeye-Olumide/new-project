


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

import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'
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

export const createUserDoc = async(userID, added ={}) => {
  const userDoc = doc(db, 'users', userID.uid)


  const userSnapShot = await getDoc(userDoc)

  if (!userSnapShot.exists()){
    const { displayName, email} = userID

    const createdAt = new Date()


    try {
      await setDoc(userDoc, {
        displayName,
        email,
        createdAt,
        bookings:[],
        ...added
      })

      alert('Sign up successful')
    } 
    
    catch (error) {
      throw new Error(error)
    }


  }


  return userDoc
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

