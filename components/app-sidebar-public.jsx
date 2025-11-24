"use client";

import * as React from "react";
import { NavUser } from "@/components/nav-user";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Library, BookOpen, Clock, User, Home } from "lucide-react";

const navItems = [
  {
    title: "Home",
    icon: Home,
    href: "/home",
  },
  {
    title: "Browse Books",
    icon: BookOpen,
    href: "/home",
  },
  {
    title: "My Borrowings",
    icon: Clock,
    href: "/my-borrowings",
  },
  {
    title: "My Profile",
    icon: User,
    href: "/profile",
  },
];

export function AppSidebar_public({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
            <Library className="h-5 w-5 text-white" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="font-bold text-sm bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Student Portal
            </h2>
            <p className="text-xs text-gray-500">Library Access</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors">
                    <Link href={item.href} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <NavUser user={props.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}