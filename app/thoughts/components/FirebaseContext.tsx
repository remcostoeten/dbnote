import { createContext, useContext } from "react"
import { Firestore } from "firebase/firestore"

import { db } from "@/lib/firebase"

export interface FirebaseContextType {
  db: Firestore
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(
  undefined
)

export const useFirebase = () => {
  const context = useContext(FirebaseContext)
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider")
  }
  return context
}

export const FirebaseProvider: React.FC = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ db }}>
      {children}
    </FirebaseContext.Provider>
  )
}
