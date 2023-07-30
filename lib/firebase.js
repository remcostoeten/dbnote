import { initializeApp } from "firebase/app"
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { updateProfile } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBsRWcpgqhqjLbcAoS7wOpoy1B53e-PSec",
  authDomain: "notes-e3c78.firebaseapp.com",
  projectId: "notes-e3c78",
  storageBucket: "notes-e3c78.appspot.com",
  messagingSenderId: "437293665802",
  appId: "1:437293665802:web:6729ee21235a4c99f299f3",
}

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
