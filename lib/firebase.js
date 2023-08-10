import { initializeApp } from "firebase/app"
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { updateProfile } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyATv2UUdbd2_ZDa1ojMA8PHE4o-kkH_ebU",
  authDomain: "remco-das.firebaseapp.com",
  projectId: "remco-das",
  storageBucket: "remco-das.appspot.com",
  messagingSenderId: "17156653421",
  appId: "1:17156653421:web:1d9dc6beeb02b05f20da64"
};

const signInWithGoogle = () => {
  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  setIsGoogleLoading(true) // Set loading state while the sign-in process is ongoing

  signInWithPopup(auth, provider)
    .then((userCredential) => {
      // Google sign-in successful
      const user = userCredential.user
      console.log(`User ${user.displayName} logged in with Google.`)

      toast({
        title: "Google login successful.",
        description: `Welcome, ${user.displayName}!`,
      })

      router.push("/productivity-tools")
    })
    .catch((error) => {
      // Handle any errors that occur during the Google sign-in process
      console.error(error)

      toast({
        title: "Google login failed.",
        description: "Failed to sign in with Google. Please try again.",
        variant: "destructive",
      })
    })
    .finally(() => {
      setIsGoogleLoading(false) // Reset loading state
    })
}

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore(app)

async function signUp(name, email, password) {
  let result = null,
    error = null
  try {
    result = await createUserWithEmailAndPassword(auth, email, password)
    if (result?.user) {
      await updateProfile(result.user, {
        displayName: name,
      })
    }
  } catch (e) {
    error = e
  }

  return { result, error }
}

export {
  auth,
  db,
  signInWithGoogle,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signUp,
}
