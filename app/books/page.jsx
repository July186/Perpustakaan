"use client";

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { DataTable } from "@/components/data-table";
import data from "./data.json";

import { useState } from "react";

export default function Page() {

 const [page, setPage] = useState("books");

  return (
    <SidebarProvider>
      <AppSidebar onNavigate={setPage} />
      <SidebarInset>
        <header
          className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <DataTable />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
