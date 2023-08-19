import React, { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"

import { db } from "@/lib/firebase"
import { Label } from "@/components/ui/label"

interface Income {
  id: string
  amount: number
  name: string
}

const IncomeList: React.FC = () => {
  const [incomes, setIncomes] = useState<Income[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "incomes"), (snapshot) => {
      const incomeData: Income[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        amount: doc.data().amount,
        name: doc.data().namae,
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
          <dl className="flex" key={income.id}>
            <Label>
              <dt>{income.namae}</dt>
            </Label>
            <dt>{income.amount}</dt>
          </dl>
        ))}
      </ul>
    </div>
  )
}

export default IncomeList
