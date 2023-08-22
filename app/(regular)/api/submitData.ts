import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Note } from "@/lib/types"; 

export const handleSubmit = async (data: Note) => {
  if (!auth.currentUser) {
    return;
  }

  try {
    const newNote: Note = {
      ...data,
      createdAt: serverTimestamp(),
      id: "",
    };

    const docRef = await addDoc(collection(db, "other_table"), newNote);
    newNote.id = docRef.id;

    return newNote;
  } catch (error) {
    throw new Error("Couldn't create note: " + error);
  }
};
