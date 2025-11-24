"use client";

import { AppSidebar_admin } from "@/components/app-sidebar-admin"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import BooksTable from "@/components/BooksTable";
import UsersTable from "@/components/UsersTable";
import BorrowsTable from "@/components/BorrowsTable";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { forbidden } from "next/navigation";

export default function Page() {
  const [page, setPage] = useState("users");
  const [group, setGroup] = useState("Master Data");

  function handleNavigate(pageName, groupName) {
    setPage(pageName);
    setGroup(groupName);
  }

  const { data: session, status, update } = useSession();

  const user = session?.user;

  if (user?.role === "public") { 
    forbidden();
  }


  return (
    <SidebarProvider>
      <AppSidebar_admin onNavigate={handleNavigate} user={user}/>
      <SidebarInset>
        <header
          className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  {group}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Skeleton*/}
          {page === "users" && <UsersTable />}
          {page === "books" && <BooksTable />}
          {page === "borrows" && <BorrowsTable />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
