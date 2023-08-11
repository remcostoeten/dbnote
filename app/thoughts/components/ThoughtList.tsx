'use client';
import React, { useEffect, useState } from "react";
import ThoughtCard from "./ThoughtCard";
import { auth, db } from "@/lib/firebase";
import { collection } from "@firebase/firestore";
import { Thought } from '@/lib/types';
import { getDocs } from "firebase/firestore";
export default function ThoughtList() {
    const [thoughts, setThoughts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchThoughts = async () => {
        const thoughtsCollection = collection(db, "thoughts")
        const snapshot = await getDocs(thoughtsCollection)
        const thoughtsData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        })) as Thought[]
        setThoughts(thoughtsData as any)
    }

    useEffect(() => {
        fetchThoughts()
    }, [])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                fetchThoughts()
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    return (
        <div>
            {thoughts.map((thought) => (
                <ThoughtCard key={thought.id} thought={thought} />
            ))}
        </div>
    );
}
