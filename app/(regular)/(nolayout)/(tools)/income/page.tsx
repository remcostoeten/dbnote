'use client';import { useEffect, useState } from "react";

import { collection, onSnapshot } from "firebase/firestore";

import { db } from "@/lib/firebase";

import { RoundedGlowButton } from "@/components/buttons/CustomButtons";
import { Input } from "@/components/ui/input";
import { usePasswordProtection } from "@/lib/usePasswordProtection";
import React from "react";
import AddIncomeExpenseForm from "./components/IncomeExpenseForm";

interface Income {
  id: string
  amount: number
  name: string
}

const IncomePage: React.FC = () => {
  const [incomes, setIncomes] = useState<Income[]>([])
  const { isAuthenticated, password, setPassword, handlePasswordSubmit } = usePasswordProtection(process.env.NEXT_PUBLIC_PASSWORD as string);

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

  return (
    <>
      {isAuthenticated ? (
        <AddIncomeExpenseForm />
      ) : (
        <div className="password-protect">
          <form onSubmit={handlePasswordSubmit}>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />

            <div className="mt-4 flex w-full justify-end">
            <RoundedGlowButton type="submit" text="Submit" />
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default IncomePage
