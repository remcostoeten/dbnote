"use client"

import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"

import { db } from "@/lib/firebase"

interface Expense {
  id: string
  amount: number
  // Add other properties as needed
}

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "expenses"), (snapshot) => {
      const expenseData: Expense[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        amount: doc.data().amount,
        // Map other properties as needed
      }))
      setExpenses(expenseData)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div>
      <h2>Expense List</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>{expense.amount}</li>
        ))}
      </ul>
    </div>
  )
}

export default ExpenseList
