import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"

import { db } from "@/lib/firebase"

interface Income {
  id: string
  amount: number
  // Add other properties as needed
}

const IncomeList: React.FC = () => {
  const [incomes, setIncomes] = useState<Income[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "incomes"), (snapshot) => {
      const incomeData: Income[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        amount: doc.data().amount,
        // Map other properties as needed
      }))
      setIncomes(incomeData)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div>
      <h2>Income List</h2>
      <ul>
        {incomes.map((income) => (
          <li key={income.id}>{income.amount}</li>
        ))}
      </ul>
    </div>
  )
}

export default IncomeList
