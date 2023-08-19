"use client"

import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"

import { db } from "@/lib/firebase"

interface Expense {
  id: string
  amount: number
  name: string
}

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "expenses"), (snapshot) => {
      const expenseData: Expense[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        amount: doc.data().amount,
        name: doc.data().name,
      }))
      setExpenses(expenseData)
    })

    return () => unsubscribe()
  }, [])

  return (
    <>
      <h2>Expense List</h2>
      {expenses.map((expense) => (
        <dl key={expense.id}>
          <dt>{expense.title}</dt>
          <dd>{expense.amount}</dd>
        </dl>
      ))}
    </>
  )
}

export default ExpenseList
