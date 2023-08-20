"use client"

import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"

import { db } from "@/lib/firebase"

import AddIncomeExpenseForm from "./components/IncomeExpenseForm"

interface Income {
  id: string
  amount: number
  name: string
}

const IncomePage: React.FC = () => {
  const [incomes, setIncomes] = useState<Income[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "incomes"), (snapshot) => {
      const incomeData: Income[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        amount: doc.data().amount,
        name: doc.data().name,
      }))
      setIncomes(incomeData)
    })

    return () => unsubscribe()
  }, [])

  return <AddIncomeExpenseForm />
}

export default IncomePage
