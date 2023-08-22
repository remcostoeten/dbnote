"use client";
import { marketingConfig } from '@/config/marketing'
import { usePathname } from 'next/navigation';
import React from 'react'
import { MainNav } from '../header/navigation-items'

export default function Header() {
  const pathname = usePathname();
  const renderHeader = pathname !== 'register';
  return (
    <>             {pathname !== '/sign-up' &&
    <header className="header cursor-hover">
    <div className="container z-40 flex h-20 items-center justify-between py-6 cursor-hover">
      <MainNav items={marketingConfig.mainNav} />
    </div>
  </header>} </>
  )
}
