'use client';
'use client';
import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { db, auth } from "@/lib/firebase";
import { Thought } from "@/lib/types";
import { onSnapshot, query, collection } from "firebase/firestore";

export default function ThoughtCard() {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchThoughts = () => {
    const thoughtsCollection = collection(db, "thoughts");
    const q = query(thoughtsCollection);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const thoughtsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Thought[];
      setThoughts(thoughtsData);
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchThoughts();
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchThoughts();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {thoughts.map((thought) => (
        <div key={thought.id} className="p-6 font-notes mt-8 mb-8 bg-[#212028] border-card rounded-2xl border-zinc-800 border">
          <div className="top flex-col flex align-middle gap-4">
            <div className="flex gap-2 w-full">
              <div className="flex gap-4 align-middle items-center flex-1">
                <div className="rounded-xl w-14 h-14 align-middle items-center justify-center bg-[#2E2D35] mr-2 flex flex-col text-center">
                  <span className="font-notes text-xs text-[#5D5C63] uppercase">
                    Tue
                  </span>
                  <span className="text-notes -translate-y-.5 text-lg font-notes-bold uppercase">
                    25
                  </span>
                </div>
                <div className="flex flex-col items">
                  <span className="text-[#EDEDEE] text-lg font-notes-bold font-notes">
                    {thought.title}
                  </span>
                  <span className="text-[#5D5C63] font-notes">20:36</span>
                </div>
              </div>
              <ContextMenu>
                <ContextMenuTrigger>. . . </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem>Edit</ContextMenuItem>
                  <ContextMenuItem>Delete</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </div>
            <ReactMarkdown
              className="text-[#5D5C63] font-notes"
              rehypePlugins={[rehypeRaw]}
            >
              {thought.description || ''}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </>
  )
}
