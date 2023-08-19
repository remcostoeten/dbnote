import React, { useEffect, useState } from "react"
import { Separator } from "@radix-ui/react-select"
import { addDoc, collection, deleteDoc, getDocs } from "firebase/firestore"
import { motion } from "framer-motion"

import { db } from "@/lib/firebase"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import {
  BorderButton,
  WeakGlowButton,
} from "@/components/buttons/CustomButtons"

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
      toast({
        title: incomeAmount + "for" + incomeName + "added!",
      })
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
      toast({
        title: expenseAmount + "for" + expenseName + "added!",
      })
    } catch (error) {
      console.error("Error adding expense:", error)
    }
  }

  const handleAddSavings = async () => {
    try {
      const docRef = await addDoc(collection(db, "savings"), {
        savingsAmount,
        name,
      })
      console.log("savings added with ID:", docRef.id)
      setSavingsAmount(0)
      setSavingsName("")
      toast({
        title: savingsAmount + "saving added!",
      })
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
      const expenseQuerySnapshot = await getDocs(collection(db, "expenses"))
      const savingsQuerySnapshot = await getDocs(collection(db, "savings"))
      const total =
        savingsQuerySnapshot.docs.reduce +
        expenseQuerySnapshot.docs.reduce(
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
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <Card className="card max-w-md  p-4 ">
              <h2 className="text-2xl font-bold mb-4">Add Income</h2>
              <div className="flex items-center mb-4 gap-2">
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
            <Card className="card max-w-md  p-4 ">
              <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
              <div className="flex items-center mb-4 gap-2">
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
              </div>
              <BorderButton onClick={handleAddExpense} text="Add Expense" />
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <Card className="card max-w-md  p-4 ">
              <h2 className="text-2xl font-bold mb-4">Add Savings</h2>
              <div className="flex items-center mb-4">
                <Input
                  type="number"
                  value={savingsAmount}
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
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          transition={{ delay: 0.6, duration: 1 }}
          className=" flex flex-col justify-between  w-full gap-2"
        >
          {" "}
          <Card className="p-4 flex flex-col gap-2">
            <dl className="flex justify-between text-2xl font-bold">
              <dd>
                <h2>Total Income:</h2>
              </dd>
              <dt className="font-normal">€{totalIncome},-</dt>
            </dl>
            <dl className="flex justify-between text-2xl font-bold">
              <dd>
                <h2>Total Expense:</h2>
              </dd>
              <dt className="font-normal">€{totalExpense},-</dt>
            </dl>
            <Separator />
            <dl className="flex justify-between text-2xl font-bold">
              <dd>
                <h2>Net Worth:</h2>
              </dd>
              <dt className="font-normal">€{netWorth},-</dt>
            </dl>
            <div className="flex mt-4 justify-end">
              <WeakGlowButton onClick={handleClearAll} text="Clear All" />
            </div>
          </Card>
        </motion.div>
      </div>
    </>
  )
}

export default AddIncomeExpenseForm
