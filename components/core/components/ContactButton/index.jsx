import React, { useContext } from "react";
import { MenuContext } from "../Menu/MenuManager";
import cn from "classnames";

export default function ContactButton() {
  const { setOpen, open } = useContext(MenuContext);

  return (
    <button
      className={cn("contact-button", { open })}
      onClick={() => setOpen(!open)}
    >
      <span>Contact us</span>
    </button>
  );
}
