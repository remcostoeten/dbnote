'use client';
import React, { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { string } from "prop-types";

interface ChangeUsernameProps {
  buttontext: string;
  title: string;
  label: string;
}


export default function ChangeUsername({ buttontext, title, label }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [userProfilePicture, setUserProfilePicture] = useState(null); // State to hold the user's profile picture
  const auth = getAuth();
  const storage = getStorage();

  useEffect(() => {
    if (auth.currentUser) {
      setUserProfilePicture(auth.currentUser?.photoURL as any);
      setName(auth.currentUser?.displayName || "");
    }
  }, [auth.currentUser]);

  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();

    if (auth.currentUser) {
      if (avatar) {
        const avatarRef = ref(storage, `avatars/${auth.currentUser.uid}`);
        await uploadBytes(avatarRef, avatar);
        const downloadURL = await getDownloadURL(avatarRef);

        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: downloadURL,
        });
      } else {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      }

      toast({
        title: "Profile updated!",
      });

      const updatedUser = getAuth().currentUser;
      if (updatedUser) {
        setName(updatedUser.displayName || "");
        setUserProfilePicture(updatedUser.photoURL as any);
      }
      document.dispatchEvent(new CustomEvent("userUpdated"));
    }
  };

  const username = name || auth.currentUser?.displayName || "";

  return (
    <>
      <h2 className="font-heading text-2xl">{title}</h2>
      <div className="-space-y-px rounded-md shadow-sm">
        <form className="mt-4 space-y-2" onSubmit={handleForm}>
          <Label htmlFor="name">{label}</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            placeholder={username}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Label htmlFor="avatar">Upload Avatar</Label>
          <Input
            id="avatar"
            name="avatar"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setAvatar(e.target.files[0])
              } else {
                setAvatar(null);
              }
            }}
          />
          <Button
            type="submit"
            className="inline-flex h-9 max-w-fit items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {buttontext}
          </Button>
        </form>
      </div>
    </>
  );
}
