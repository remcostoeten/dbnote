'use client';
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

interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await auth.currentUser;
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col space-y-6 mt-4 mb-4">
        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
          <aside className="hidden w-[200px] flex-col md:flex">
            <DashboardNav items={dashboardConfig.sidebarNav} />
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            <Greeting />
            {children}
          </main>
        </div>
        <SiteFooter className="border-t" />
      </div>
    </AuthProvider>
  );
}

export default withAuth(RootLayout);
