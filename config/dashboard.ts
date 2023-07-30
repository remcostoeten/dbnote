import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Account",
      href: "/productivity-tools/account",
      icon: "post",
    },
    {
      title: "Posts",
      href: "/productivity-tools",
      icon: "post",
    },
    {
      title: "Data",
      href: "/productivity-tools/data",
      icon: "billing",
    },
    {
      title: "Work log",
      href: "/productivity-tools/users",
      icon: "billing",
    },
    {
      title: "Expenses",
      href: "/productivity-tools/expenses",
      icon: "billing",
    },
    {
      title: "Uitzet",
      href: "/producitvity-tools/uitzet",
      icon: "billing",
    },
    {
      title: "Billing",
      href: "/producitvity-tools/billing",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/producitvity-tools/settings",
      icon: "settings",
    },
  ],
}
