"use client";

import * as React from "react";
import { ChevronRight, Book, Users, Clock, BarChart, Library, Shield } from "lucide-react";
import { NavUser } from "@/components/nav-user";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const navData = {
  navMain: [
    {
      title: "Master Data",
      items: [
        {
          title: "Users",
          key: "users",
          icon: Users
        },
        {
          title: "Books",
          key: "books",
          icon: Book
        },
      ],
    },
    {
      title: "Borrowings",
      items: [
        {
          title: "Borrows",
          key: "borrows",
          icon: Clock
        },
      ],
    },
  ],
};

export function AppSidebar_admin({ onNavigate, ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="font-bold text-sm bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Portal
            </h2>
            <p className="text-xs text-gray-500">Management System</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-2 p-2">
        {navData.navMain.map((section) => (
          <Collapsible
            key={section.title}
            defaultOpen
            className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg px-3 py-2 text-sm font-semibold">
                <CollapsibleTrigger className="flex items-center gap-2">
                  {section.icon && <section.icon className="h-4 w-4" />}
                  <span>{section.title}</span>
                  <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.key}>
                        <SidebarMenuButton 
                          asChild 
                          className="hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                        >
                          <button 
                            className="w-full flex items-center gap-3 px-3 py-2" 
                            onClick={() => onNavigate(item.key, section.title)}
                          >
                            {item.icon && <item.icon className="h-4 w-4" />}
                            <span>{item.title}</span>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-2">
        <NavUser user={props.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}