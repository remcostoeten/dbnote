"use client"

import { Label } from "@radix-ui/react-label"
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs, QueryDocumentSnapshot
} from "firebase/firestore"
import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"

import {
  BorderButton, RoundedGlowButton
} from "@/components/buttons/CustomButtons"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { auth, db } from "@/lib/firebase"

import Spinner from '@/components/core/Spinner'

interface Expense {
  id: string
  name: string
  isLoading: boolean
  expenseAmount: number
  incomeAmount: any
}

const AddIncomeExpenseForm: React.FC = () => {
  const [expenseAmount, setExpenseAmount] = useState<number>(0)
  const [incomeAmount, setIncomeAmount] = useState<number>(0)
  const [expenseName, setExpenseName] = useState<string>("")
  const [savingsName, setSavingsName] = useState<string>("")
  const [savingsAmount, setSavingsAmount] = useState<number>(0)
  const [incomeName, setIncomeName] = useState<string>("")
  const [totalIncome, setTotalIncome] = useState<number>(0)
  const [totalExpense, setTotalExpense] = useState<number>(0)
  const [netWorth, setNetWorth] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const user = auth?.currentUser
  const [expenses, setExpenses] = useState([
    { id: 1, name: "Dinner", amount: 50, category: "Food" },
  ])
  const [incomes, setIncomes] = useState([
    { id: 1, name: "Dinner", amount: 50, category: "Food" },
  ])
  const [selectedCategory, setSelectedCategory] = useState("")

  const fetchData = async () => {
    const expenseQuerySnapshot = await getDocs(collection(db, "expenses"))
    const fetchedExpenses = expenseQuerySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      expenseAmount: doc.data().expenseAmount,
    }))
    setExpenses(fetchedExpenses as any)

    const incomeQuerySnapshot = await getDocs(collection(db, "incomes"))
    const fetchedIncomes = incomeQuerySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      incomeAmount: doc.data().incomeAmount,
    }))
    setIncomes(fetchedIncomes as any)

    await calculateTotalIncome()
    await calculateTotalExpense()

    setIsLoading(false)
  }

  const expenseQuerySnapshot = getDocs(collection(db, "expenses"))
  useEffect(() => {
    const fetchData = async () => {
      const expenseQuerySnapshot = await getDocs(collection(db, "expenses"))
      const fetchedExpenses = expenseQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        expenseAmount: doc.data().expenseAmount,
      }))
      setExpenses(fetchedExpenses as any)

      const incomeQuerySnapshot = await getDocs(collection(db, "incomes"))
      const fetchedIncomes = incomeQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        incomeAmount: doc.data().incomeAmount,
      }))
      setIncomes(fetchedIncomes as any)

      await calculateTotalIncome()
      await calculateTotalExpense()

      setIsLoading(false)
    }

    fetchData()
  }, [])
  const handleAddIncome = async () => {
    try {
      const docRef = await addDoc(collection(db, "incomes"), {
        incomeAmount,
        name: incomeName,
      })
      console.log("Income added with ID:", docRef.id)
      setIncomeAmount(0)
      setIncomeName("")
      calculateTotalIncome()
      toast({
        title: incomeAmount + " for " + incomeName + " added!",
      })
      fetchData()
    } catch (error) {
      console.error("Error adding income:", error)
    }
  }

  const handleAddExpense = async () => {
    try {
      const docRef = await addDoc(collection(db, "expenses"), {
        expenseAmount,
        name: expenseName,
        category: selectedCategory,
        userId: user ? user.uid : null,
      })
      console.log("Expense added with ID:", docRef.id)
      setExpenseAmount(0)
      setExpenseName("")
      setSelectedCategory("")
      calculateTotalExpense()
      toast({
        title: expenseAmount + " for " + expenseName + " added!",
      })
      fetchData()
    } catch (error) {
      console.error("Error adding expense:", error)
    }
  }

  const handleAddSavings = async () => {
    try {
      const docRef = await addDoc(collection(db, "savings"), {
        savingsAmount,
        name: savingsName,
      })
      console.log("Savings added with ID:", docRef.id)
      setSavingsAmount(0)
      setSavingsName("")
      toast({
        title: savingsAmount + " saving added!",
      })
      fetchData()
    } catch (error) {
      console.error("Error adding Savings:", error)
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

      const savingsQuerySnapshot = await getDocs(collection(db, "savings"))
      savingsQuerySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref)
      })

      setSavingsAmount(0)
      setIncomeAmount(0)
      setExpenseAmount(0)
      setIncomeName("")
      setExpenseName("")
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
      const userExpenses = (await expenseQuerySnapshot).docs.filter(
        (doc) => doc.data().userId === (user ? user.uid : null)
      )

      const total = userExpenses.reduce(
        (acc: number, doc: QueryDocumentSnapshot) =>
          acc + doc.data().expenseAmount,
        0
      )

      setTotalExpense(total)
    } catch (error) {
      console.error("Error calculating total expense:", error)
    }
  }

  const calculateNetWorth = () => {
    const netWorth = totalIncome - totalExpense
    setNetWorth(netWorth)
  }

  function sortByCategory(a, b) {
    if (a.category < b.category) return -1
    if (a.category > b.category) return 1
    return 0
  }

  return (
    <>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <Card className="card expense p-8 ">
                  <h2 className="text-2xl font-bold mb-4">Add Income</h2>
                  <div className="flex items-center mb-4 gap-4">
                    <Input
                      type="number"
                      placeholder="€ ,-"
                      value={incomeAmount}
                      onChange={(e) => setIncomeAmount(Number(e.target.value))}
                    />
                    <Input
                      type="text"
                      value={incomeName}
                      onChange={(e) => setIncomeName(e.target.value)}
                      placeholder="Income Name"
                    />
                  </div>
                  <BorderButton onClick={handleAddIncome} text="Add Income" />
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <Card className="card expense p-8 ">
                  <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
                  <div className="flex items-center mb-4 gap-4">
                    <Input
                      type="number"
                      value={expenseAmount}
                      placeholder="€ ,-"
                      onChange={(e) => setExpenseAmount(Number(e.target.value))}
                    />
                    <Input
                      type="text"
                      value={expenseName}
                      onChange={(e) => setExpenseName(e.target.value)}
                      placeholder="Expense Name"
                    />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="Food">Food</option>
                      <option value="Transport">Transport</option>
                      <option value="Utilities">Utilities</option>
                    </select>
                  </div>
                  <BorderButton onClick={handleAddExpense} text="Add Expense" />
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="flex flex-col gap-4"
              >
                <Card className="card expense p-8 ">
                  <h2 className="text-2xl font-bold mb-4">Add Savings</h2>
                  <div className="flex items-center mb-4">
                    <Input
                      type="number"
                      value={savingsAmount}
                      placeholder="€ ,-"
                      onChange={(e) => setSavingsAmount(Number(e.target.value))}
                      className="w-1/2 p-2 border border-gray-300 rounded-md mr-2"
                    />
                    <Input
                      type="text"
                      value={savingsName}
                      onChange={(e) => setSavingsName(e.target.value)}
                      placeholder="Savings Name"
                      className="w-1/2 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <BorderButton onClick={handleAddSavings} text="Add Savings" />
                </Card>
              </motion.div>
            </div>                  
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="flex flex-col gap-4"
              >
            <div className="flex gap-4 w-full ">
              <Card className="card flex-col flex flex-1 expense p-8 ">
                <dl className="text-2xl font-bold mb-4">Expenses List:</dl>
                {expenses.map((expense) => (
  <dl className="flex justify-between w-full" key={expense.id}>
    <dd>Name: {expense.name}</dd>
    <Label>{expense.category}</Label>
    <dt>Amount: €{expenseAmount},-</dt>
  </dl>
))}

              </Card>
              <Card className="card flex-col flex flex-1 expense p-8 ">
                <dl className="text-2xl font-bold mb-4">Income List:</dl>
                {incomes.map((income) => (
  <dl className="flex justify-between w-full" key={income.id}>
    <dd>Name: {income.name}</dd>
    <dt>Amount: €{incomeAmount},-</dt>
  </dl>
))}

              </Card>

            </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex flex-col justify-between  w-full gap-4"
          >
            <Card className="card expense p-8 ">
       <dl className="flex justify-between text-2xl font-bold">
                <dd>
                  <h2>Total Income:</h2>
                </dd>
                <dt className="font-normal">€{totalIncome},-</dt>
              </dl>
              <dl className="flex justify-between text-2xl font-bold">
                <dd>
                  <h2>Total expense:</h2>
                </dd>
                {isLoading ? (
        <Spinner />
      ) : ( 
                <dt className="font-normal">€{totalExpense},-</dt>
                )}              </dl>
              <dl className="flex justify-between text-2xl font-bold">
                <dd>
                  <h2>Net Worth:</h2>
                </dd> 
                {isLoading ? (
        <Spinner />
      ) : ( 
                <dt className="font-normal">€{netWorth},-</dt>
                )}
              </dl>
              <div className="flex mt-4 justify-end">
                <RoundedGlowButton  onClick={handleClearAll} text="Clear All"/>
              </div>
            </Card>
          </motion.div>
        </div>
    </>
  )
}

export default AddIncomeExpenseForm
