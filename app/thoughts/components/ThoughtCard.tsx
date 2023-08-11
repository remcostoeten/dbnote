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
import { onSnapshot, query, collection, deleteDoc, doc, getDocs, writeBatch } from "firebase/firestore";
import { toast } from "@/components/ui/use-toast";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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

  const handleRemove = (thoughtId: string) => {
    setThoughts(prev => prev.filter(t => t.id !== thoughtId));

    setTimeout(async () => {
      try {
        await deleteDoc(doc(db, "thoughts", thoughtId));
        toast({
          title: "Note deleted successfully.",
        });
      } catch (error) {
        toast({
          title: "Couldn't delete note.",
          variant: "destructive",
        });
        console.error(error);
      }
    }, 500);
  }

  const handleRemoveAll = async () => {
    try {
      const thoughtsCollection = collection(db, "thoughts");
      const snapshot = await getDocs(thoughtsCollection);

      const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));

      await Promise.all(deletePromises);

      toast({
        title: "All notes deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Couldn't delete notes.",
        variant: "destructive",
      });
      console.error(error);
    }
  }

  return (
    <>
      <span className="absolute right-4 top-4" onClick={handleRemoveAll}>rm - rf all thoughts</span>
      <TransitionGroup>
        {thoughts.map((thought) => (
          <CSSTransition key={thought.id} timeout={500} classNames="fade">
            <div className="icon-card border flex flex-col mb-4 justify-between rounded-md p-6" key={thought.id}>
              <div className="top sidebar-notes flex-col flex align-middle gap-4">
                <div className="flex gap-2 w-full">
                  <div className="flex gap-4 align-middle items-center flex-1">
                    <div className="rounded-xl w-14 h-14 align-middle items-center justify-center mr-2 flex flex-col text-center border    ">
                      <span className="font-notes text-xs text-[#5D5C63] uppercase">
                        {thought.selectedDate
                          ? thought.selectedDate.toDate().toLocaleString('en-US', { weekday: 'short' })
                          : "N/A"}
                      </span>

                      <span className="text-notes -translate-y-.5 text-lg font-notes-bold uppercase">
                        {thought.selectedDate
                          ? thought.selectedDate.toDate().getDate()
                          : "N/A"}
                      </span>

                    </div>
                    <div className="flex flex-col items">
                      <span className="text-[#EDEDEE] text-lg font-notes-bold font-notes">
                        {thought.title}
                      </span>

                      <span className="text-[#5D5C63] font-notes">
                        {thought.createdAt
                          ? thought.createdAt.toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                  <ContextMenu>
                    <ContextMenuTrigger>. . . </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem>Edit</ContextMenuItem>
                      <ContextMenuItem>
                        <span onClick={() => handleRemove(thought.id)}>
                          Delete
                        </span>
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </div>
                <ReactMarkdown
                  className="text-[#5D5C63] font-notes"
                  rehypePlugins={[rehypeRaw]}
                >
                  {thought.description || ""}
                </ReactMarkdown>

              </div>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
}
