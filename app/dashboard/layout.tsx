'use client';

import { useEffect, useState } from "react";
import { AuthProvider } from "@/AuthContext";

import { dashboardConfig } from "@/config/dashboard";
import { auth } from "@/lib/firebase";
import Greeting from "@/components/Greeting";
import { DashboardNav } from "@/components/nav";
import { SiteFooter } from "@/components/site-footer";
import withAuth from "@/lib/withAuth";
import { User } from "firebase/auth";
import { Separator } from "@radix-ui/react-select";
import { SidebarNav } from "./forms/components/sidebar-nav";



const sidebarNavItems = [
  {
    title: "Profile",
    href: "/examples/forms",
  },
  {
    title: "Account",
    href: "/examples/forms/account",
  },
  {
    title: "Appearance",
    href: "/examples/forms/appearance",
  },
  {
    title: "Notifications",
    href: "/examples/forms/notifications",
  },
  {
    title: "Display",
    href: "/examples/forms/display",
  },
]

interface RootLayoutProps {
  children: React.ReactNode
}

function RootLayout({ children }: RootLayoutProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await auth.currentUser;
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  const layoutContent = (
    <div className={`container ${!user ? "blur-sm" : ""} space-y-6 p-10 pb-16 md:block`}>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 flex-col lg:max-w-2xl">
          <Greeting />
          {children}
        </div>
      </div>
      <SiteFooter className="border-t" />
    </div>
  );

  return user ? layoutContent : <AuthProvider>{layoutContent}</AuthProvider>;
}
export default withAuth(RootLayout);
