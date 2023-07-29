import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { auth } from "@/lib/firebase"

export default function ProtectedRoute(Component) {
  return () => {
    const router = useRouter()
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
      auth.onAuthStateChanged((authUser) => {
        if (!authUser) {
          useRouter.push("/login") // Redirect to login if user is not authenticated
        } else {
          setCurrentUser(authUser)
        }
      })
    }, [])

    return <>{currentUser && <Component {...arguments} />}</>
  }
}
