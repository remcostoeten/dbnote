"use client"

import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"

import { db } from "@/lib/firebase"

import AddIncomeExpenseForm from "./components/a"

interface Income {
  id: string
  amount: number
  // Add other properties as needed
}

const IncomePage: React.FC = () => {
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
      <h1>Income Page</h1>
      <AddIncomeExpenseForm />
      <ul>
        {incomes.map((income) => (
          <li key={income.id}>{income.amount}</li>
        ))}
      </ul>
    </div>
  )
}

export default IncomePage
