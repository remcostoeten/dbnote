"use client"
"use client";
import React, { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { PlusSquare } from "lucide-react";
import { Drawer } from "vaul";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { auth, db } from "@/lib/firebase";
import { Thought } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

export function NewThought({ content }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [loading, setLoading] = useState(false);
  const user = auth?.currentUser;
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user", user);
      }
      setLoading(false);
    });
    return (): void => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      return;
    }

    try {
      const newThought: Thought = {
        title,
        userId: user.uid,
        description: markdownContent,
        createdAt: serverTimestamp(),
        id: "",
      };

      const docRef = await addDoc(collection(db, "thoughts"), newThought);
      newThought.id = docRef.id;

      setThoughts((prevThoughts: Thought[]) => [newThought, ...prevThoughts]);
      setDescription("");
      setTitle("");
      setMarkdownContent("");
      toast({
        title: "Thought created successfully.",
        description: `with title ${title}`,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `Your sign-in request failed. Please try again. ${error}`,
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setOpen(false);
      document.body.classList.add('drawer-closed');
    }
  };

  const form = (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ReactQuill
        placeholder="Thought content"
        value={markdownContent}
        onChange={setMarkdownContent}
      />
      <Button type="submit" className="inline-flex w-fit">
        New post
      </Button>
    </form>
  );


  const toggleClass = () => {
    document.body.classList.remove('drawer-closed');
  }

  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild onClick={() => setOpen(true)}>
        <PlusSquare onClick={toggleClass} className="font-2xl w-[40px]" />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed  bottom-0 left-0 right-0 mt-24 flex h-[50vh] flex-col rounded-t-[10px] bg-zinc-100">
          <div className="flex-1 rounded-t-[10px] bg-[#212028] [text-[#5D5C63] font-notes] p-4">
            <div className="mx-auto max-w-md">
              <Drawer.Title className="mb-4 font-medium">
                Add whatever is on your mind.
              </Drawer.Title>
              {form}
              <Drawer.Trigger onClick={() => setOpen(false)}>
                <span>Close</span>
              </Drawer.Trigger>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
