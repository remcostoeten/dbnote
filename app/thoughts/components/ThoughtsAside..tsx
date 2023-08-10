import React from 'react'
import { useEffect, useState } from 'react'
import { AuthProvider } from '@/AuthContext'
import { auth } from '@/lib/firebase'
import { SiteFooter } from '@/components/site-footer'
import { User } from 'firebase/auth'
import { SidebarNav } from '../../ui-elements/forms/components/sidebar-nav'

export const ThoughtsAside = () => (
  <div className={`container space-y-6 p-10 pb-16 md:block`}>
    <p className="space-y-0.5">
      <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
    </p>
  </div>
)
