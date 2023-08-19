"use client"

// withAuth.tsx
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Unsubscribe, getAuth, onAuthStateChanged } from "firebase/auth"

const withAuth = (WrappedComponent: React.FC) => {
  return (props: React.ComponentProps<typeof WrappedComponent>) => {
    const Router = useRouter()

    useEffect(() => {
      const auth = getAuth()
      const unsubscribe: Unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          Router.push("/login")
        }
      })

      return () => unsubscribe()
    }, [])

    return <WrappedComponent {...props} />
  }
}

export default withAuth
