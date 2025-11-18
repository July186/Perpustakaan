"use client";

import { AppSidebar } from "@/components/app-sidebar"
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

import DataTable from "@/components/BooksPanel";
import UsersTable from "@/components/UsersTable";
import BorrowsTable from "@/components/BorrowsTable";
import { useState } from "react";

export default function Page() {
  const [page, setPage] = useState("users");
  const [group, setGroup] = useState("Master Data");

  function handleNavigate(pageName, groupName) {
    setPage(pageName);
    setGroup(groupName);
  }

  return (
    <SidebarProvider>
      <AppSidebar onNavigate={handleNavigate} />
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
          {page === "books" && <DataTable />}
          {page === "borrows" && <BorrowsTable />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
