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
      title: "Posts",
      href: "/producitvity-tools",
      icon: "post",
    },
    {
      title: "Data",
      href: "/producitvity-tools/data",
      icon: "billing",
    },
    {
      title: "Work log",
      href: "/producitvity-tools/users",
      icon: "billing",
    },
    {
      title: "Expenses",
      href: "/producitvity-tools/expenses",
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
