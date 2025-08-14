import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTm7eML2epODNzAu2Gj7gs2n1SIWuhOaM",
  authDomain: "netflixclone-hh.firebaseapp.com",
  projectId: "netflixclone-hh",
  storageBucket: "netflixclone-hh.firebasestorage.app",
  messagingSenderId: "313787739287",
  appId: "1:313787739287:web:3ae5fa87aaec2de4d2cdd2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        })
    } catch(error){
        console.log(error);
        alert(error);
    }
}

const login = async (email, password)=>{
    try{
        signInWithEmailAndPassword(auth, email, password);
    } catch(error){
        console.log(error);
        alert(error);
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, logout, signup}