import React, { useEffect, useState } from "react"
import { addDoc, collection, deleteDoc, getDocs } from "firebase/firestore"

import { db } from "@/lib/firebase"

const AddIncomeExpenseForm: React.FC = () => {
  const [amount, setAmount] = useState<number>(0)
  const [name, setName] = useState<string>("")
  const [totalIncome, setTotalIncome] = useState<number>(0)
  const [totalExpense, setTotalExpense] = useState<number>(0)
  const [netWorth, setNetWorth] = useState<number>(0)

  const handleAddIncome = async () => {
    try {
      const docRef = await addDoc(collection(db, "incomes"), { amount, name })
      console.log("Income added with ID:", docRef.id)
      setAmount(0)
      setName("")
      calculateTotalIncome()
    } catch (error) {
      console.error("Error adding income:", error)
    }
  }

  const handleAddExpense = async () => {
    try {
      const docRef = await addDoc(collection(db, "expenses"), { amount, name })
      console.log("Expense added with ID:", docRef.id)
      setAmount(0)
      setName("")
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

      setAmount(0)
      setName("")
      setTotalIncome(0)
      setTotalExpense(0)
      setNetWorth(0)
    } catch (error) {
      console.error("Error clearing all data:", error)
    }
  }

  const calculateTotalIncome = async () => {
    try {
      const incomeQuerySnapshot = await getDocs(collection(db, "incomes"))
      const total = incomeQuerySnapshot.docs.reduce(
        (acc, doc) => acc + doc.data().amount,
        0
      )
      setTotalIncome(total)
      calculateNetWorth() // Recalculate net worth after updating total income
    } catch (error) {
      console.error("Error calculating total income:", error)
    }
  }

  const calculateTotalExpense = async () => {
    try {
      const expenseQuerySnapshot = await getDocs(collection(db, "expenses"))
      const total = expenseQuerySnapshot.docs.reduce(
        (acc, doc) => acc + doc.data().amount,
        0
      )
      setTotalExpense(total)
      calculateNetWorth() // Recalculate net worth after updating total expense
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
  }, []) // Run these calculations once when the component mounts

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <div>
        <h2 className="text-2xl font-bold mb-4">Add Income</h2>
        <div className="flex items-center mb-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-1/2 p-2 border border-gray-300 rounded-md mr-2"
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Income Name"
            className="w-1/2 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={handleAddIncome}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Income
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-bold mt-8 mb-4">Add Expense</h2>
        <div className="flex items-center mb-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-1/2 p-2 border border-gray-300 rounded-md mr-2"
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Expense Name"
            className="w-1/2 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={handleAddExpense}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Add Expense
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Total Income: {totalIncome}</h2>
        <h2 className="text-2xl font-bold">Total Expense: {totalExpense}</h2>
        <h2 className="text-2xl font-bold">Net Worth: {netWorth}</h2>
      </div>

      <button
        onClick={handleClearAll}
        className="bg-gray-500 text-white py-2 px-4 rounded-md mt-8 hover:bg-gray-600"
      >
        Clear All
      </button>
    </div>
  )
}

export default AddIncomeExpenseForm
