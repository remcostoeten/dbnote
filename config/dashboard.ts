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
      href: "/dashboard/account",
      icon: "post",
    },
    {
      title: "Posts",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Data",
      href: "/dashboard/data",
      icon: "billing",
    },
    {
      title: "Work log",
      href: "/dashboard/users",
      icon: "billing",
    },
    {
      title: "Expenses",
      href: "/dashboard/expenses",
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
