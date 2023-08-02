"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // corrected import name
import { Select, SelectValue } from "@radix-ui/react-select";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import PostIntro from "../../components/ui-dashboard/PostIntro"; // corrected import path
import { MyDrawer } from "../../components/Drawer"; // corrected import path
import { Icons } from "@/components/icons";

interface Note {
  id: string;
  title: string;
  userId: string;
  content: string;
  category: string;
  createdAt: any; // You might want to use the correct type for serverTimestamp()
}

export default function Dashboard() {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editModeMap, setEditModeMap] = useState<{ [key: string]: boolean }>({});
  const user = auth?.currentUser;

  const fetchNotes = async () => {
    const notesCollection = collection(db, "notes");
    const snapshot = await getDocs(notesCollection);
    const notesData = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Note[]; // Added type assertion
    setNotes(notesData);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const categories = [
    { id: "1", name: "Pleio" },
    { id: "2", name: "Softhouse" },
    { id: "3", name: "Prive" },
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchNotes();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleEditMode = (id: string | number) => {
    setEditModeMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleEdit = async (data: Note) => {
    try {
      await updateDoc(doc(db, "datas", data.id), {
        title: data.title,
        content: data.content,
      });

      toggleEditMode(data.id);

      toast({
        title: "data updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Couldn't update data.",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      return;
    }

    try {
      const newNote: Note = {
        title,
        userId: user.uid,
        content,
        category,
        createdAt: serverTimestamp(),
        id: "",
      };

      const docRef = await addDoc(collection(db, "notes"), newNote);
      newNote.id = docRef.id;

      setNotes((prevNotes: Note[]) => [newNote, ...prevNotes]);
      setCategory("");
      setTitle("");
      setContent("");
      toast({
        title: "Note created successfully.",
        description: `In the category ${category} with title ${title}`,
      });
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `Your sign-in request failed. Please try again. ${error}`,
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const handleRemove = async (userId: string) => {
    try {
      await deleteDoc(doc(db, "notes", userId));
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
  };



  const form = (
    <form className="flex gap-2 flex-col" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Select onValueChange={setCategory} value={category}>
        <SelectTrigger>
          <SelectValue placeholder="Select a verified email to display" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Textarea
        placeholder="Note content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button onClick={(e) => { e.preventDefault(); handleSubmit(e); }} className="inline-flex w-fit">
        New post
      </Button>
    </form>
  )

  return (
    <>
      <div className="max-w-3xl">
        <div className="grid items-start gap-8">
          <PostIntro title="Posts" text="Create and manage posts." />
          <form className="flex gap-2 flex-col" onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger>
                <SelectValue placeholder="Select a verified email to display" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Textarea
              placeholder="Note content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button onClick={handleSubmit} className="inline-flex w-fit">
              New post
            </Button>
            <MyDrawer content={form} />
          </form>


          <div className="pb-2 ">
            {notes.map((note) => (
              <div
                key={note.id}
                className="divide-y divide-border rounded-md border"
              >
                <div className="flex  py-4 px-8 content-center flex-col gap-2">
                  {editModeMap[note.userId] ? (
                    <>
                      <Input
                        type="text"
                        value={note.title}
                        onChange={(e) =>
                          setNotes((prevNotes) =>
                            prevNotes.map((prevNote) =>
                              prevNote.userId === note.userId
                                ? { ...prevNote, title: e.target.value }
                                : prevNote
                            )
                          )
                        }
                      />
                      <Textarea
                        value={note.content}
                        onChange={(e) =>
                          setNotes((prevNotes) =>
                            prevNotes.map((prevNote) =>
                              prevNote.userId === note.userId
                                ? { ...prevNote, content: e.target.value }
                                : prevNote
                            )
                          )
                        }
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEdit(note)}
                          className={cn(
                            buttonVariants({
                              variant: "primary",
                              color: "success",
                              size: "sm",
                              width: "w-fit",
                            })
                          )}
                        >
                          Save
                        </Button>
                        <Button
                          onClick={() => toggleEditMode(note.userId)}
                          className={cn(
                            buttonVariants({
                              variant: "primary",
                              color: "danger",
                              size: "sm",
                              width: "w-fit",
                            })
                          )}
                        >
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="font-semibold hover:underline flex flex-col">
                        {note.title}
                        <small>{note.category}</small>
                        <p>{note.content}</p>{" "}
                      </span>
                      <div>
                        <p className="text-sm text-muted-foreground"></p>{" "}
                      </div>
                      <span onClick={() => handleRemove(note.userId)}>
                        Delete
                      </span>
                      <Button
                        onClick={() => toggleEditMode(note.userId)}
                        className={cn(
                          buttonVariants({
                            variant: "primary",
                            color: "info",
                            size: "sm",
                          })
                        )}
                      >
                        Edit
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <form>
          <div className="grid w-full gap-10 mx-auto m-w-[1280px]">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center space-x-10">
                <p className="text-sm text-muted-foreground">dddd </p>
              </div>
              <Button
                type="submit"
                className={buttonVariants({ variant: "ghost" })}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
        {notes.map((note) => (
          <label key={note.id} className="flex items-center gap-2">
            <input type="checkbox" value={note.title} />
            {note.title}
          </label>
        ))}
      </div>
    </>
  );
}
