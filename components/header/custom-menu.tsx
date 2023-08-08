'use client';

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useEffect, useRef, useState } from "react";

interface Component {
  title: string;
  href: string;
  description: string;
}

const components: Component[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]
export default function CustomMenu() {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null); // Specify the type of the ref

  const handleOutsideClick = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setActiveItem(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <NavigationMenu ref={menuRef}>
      <NavigationMenuList>
        <NavigationMenuItem
          className={activeItem === 0 ? 'active' : ''}
          onClick={() => setActiveItem(0)}
          onMouseLeave={() => setActiveItem(null)}
        >
        </NavigationMenuItem>
        <NavigationMenuItem
          className={activeItem === 1 ? 'active' : ''}
          onClick={() => setActiveItem(1)}
          onMouseLeave={() => setActiveItem(null)}
        >
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            {components.map((component, index) => (
              <NavigationMenuLink key={index} href={component.href}>
                {component.title}
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}