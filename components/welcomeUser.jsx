import { auth } from "@/lib/firebase"

export default function welcomeUser() {
  const user = auth.currentUser
  return <>Welcome {user}</>
}
