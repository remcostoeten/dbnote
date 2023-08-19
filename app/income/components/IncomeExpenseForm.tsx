import React, { useEffect, useState } from "react"
import { Separator } from "@radix-ui/react-select"
import { addDoc, collection, deleteDoc, getDocs } from "firebase/firestore"

import { db } from "@/lib/firebase"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  BorderButton,
  GlowButton,
  WeakGlowButton,
} from "@/components/buttons/CustomButtons"

const AddIncomeExpenseForm: React.FC = () => {
  const [expenseAmount, setExpenseAmount] = useState<number>("")
  const [incomeAmount, setIncomeAmount] = useState<number>("")
  const [expenseName, setExpenseName] = useState<string>("")
  const [incomeName, setIncomeName] = useState<string>("")
  const [totalIncome, setTotalIncome] = useState<number>("")
  const [totalExpense, setTotalExpense] = useState<number>("")
  const [netWorth, setNetWorth] = useState<number>(0)

  const handleAddIncome = async () => {
    try {
      const docRef = await addDoc(collection(db, "incomes"), {
        incomeAmount,
        name,
      })
      console.log("Income added with ID:", docRef.id)
      setIncomeAmount(0)
      setIncomeName("")
      calculateTotalIncome()
    } catch (error) {
      console.error("Error adding income:", error)
    }
  }

  const handleAddExpense = async () => {
    try {
      const docRef = await addDoc(collection(db, "expenses"), {
        expenseAmount,
        name,
      })
      console.log("Expense added with ID:", docRef.id)
      setExpenseAmount(0)
      setExpenseName("")
      calculateTotalExpense()
    } catch (error) {
      console.error("Error adding expense:", error)
    }
  }

  const handleClearAll = async () => {
    try {
      const incomeQuerySnapshot = await getDocs(collection(db, "incomes"))
      incomeQuerySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref)
      })

      const expenseQuerySnapshot = await getDocs(collection(db, "expenses"))
      expenseQuerySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref)
      })

      setIncomeAmount("")
      setExpenseAmount("")
      setIncomeName("")
      setExpenseName("")
      setTotalIncome("")
      setTotalExpense("")
      setNetWorth("")
    } catch (error) {
      console.error("Error clearing all data:", error)
    }
  }

  const calculateTotalIncome = async () => {
    try {
      const incomeQuerySnapshot = await getDocs(collection(db, "incomes"))
      const total = incomeQuerySnapshot.docs.reduce(
        (acc, doc) => acc + doc.data().incomeAmount,
        0
      )
      setTotalIncome(total)
      calculateNetWorth()
    } catch (error) {
      console.error("Error calculating total income:", error)
    }
  }

  const calculateTotalExpense = async () => {
    try {
      const expenseQuerySnapshot = await getDocs(collection(db, "expenses"))
      const total = expenseQuerySnapshot.docs.reduce(
        (acc, doc) => acc + doc.data().expenseAmount,
        0
      )
      setTotalExpense(total)
      calculateNetWorth()
    } catch (error) {
      console.error("Error calculating total expense:", error)
    }
  }

  const calculateNetWorth = () => {
    const netWorth = totalIncome - totalExpense
    setNetWorth(netWorth)
  }

  useEffect(() => {
    calculateTotalIncome()
    calculateTotalExpense()
  }, [])

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Card className="card max-w-md  p-4 ">
            <h2 className="text-2xl font-bold mb-4">Add Income</h2>
            <div className="flex items-center mb-4">
              <Input
                type="number"
                placeholder="€ ,-"
                value={incomeAmount}
                onChange={(e) => setIncomeAmount(Number(e.target.value))}
                className="w-1/2 p-2 border border-gray-300 rounded-md mr-2"
              />
              <Input
                type="text"
                value={incomeName}
                onChange={(e) => setIncomeName(e.target.value)}
                placeholder="Income Name"
                className="w-1/2 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <BorderButton onClick={handleAddIncome} text="Add Income" />
          </Card>
          <Card className="card max-w-md  p-4 ">
            <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
            <div className="flex items-center mb-4">
              <Input
                type="number"
                value={expenseAmount}
                placeholder="€ ,-"
                onChange={(e) => setExpenseAmount(Number(e.target.value))}
                className="w-1/2 p-2 border border-gray-300 rounded-md mr-2"
              />
              <Input
                type="text"
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
                placeholder="Expense Name"
                className="w-1/2 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <BorderButton onClick={handleAddExpense} text="Add Expense" />
          </Card>
        </div>
        <Card className="p-4 flex flex-col gap-2">
          <div className=" flex flex-col justify-between  w-full gap-2">
            <h2 className="flex justify-between text-2xl font-bold">
              Total Income:
              <span className="font-normal">€{totalIncome},-</span>
            </h2>
            <h2 className="flex justify-between text-2xl font-bold">
              Total Expense:{" "}
              <span className="font-normal">€{totalExpense},-</span>
            </h2>
            <Separator />
            <h2 className="flex justify-between text-2xl font-bold">
              Net Worth: <span className="font-normal">€{netWorth},-</span>
            </h2>
          </div>
          <div className="flex mt-4 justify-end">
            <WeakGlowButton
              onClick={handleClearAll}
              text="Clear All"
              link={false}
            />
          </div>{" "}
        </Card>
      </div>
    </>
  )
}

export default AddIncomeExpenseForm
