import React, { ReactNode, createContext, useContext } from "react"
import { Firestore } from "firebase/firestore"

import { db } from "@/lib/firebase"

export interface FirebaseContextType {
  db: Firestore
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(
  undefined
)

export const useFirebase = (): FirebaseContextType => {
  const context = useContext(FirebaseContext)
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider")
  }
  return context
}

interface FirebaseProviderProps {
  children: ReactNode
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
}) => {
  return (
    <FirebaseContext.Provider value={{ db }}>
      {children}
    </FirebaseContext.Provider>
  )
}
