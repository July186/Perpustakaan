import * as React from "react"
import { ChevronRight } from "lucide-react"
import { NavUser } from "@/components/nav-user"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    user: {
      name: "naruto",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
  navMain: [
    {
      title: "Master Data",
      url: "#",
      items: [
        {
          title: "Users",
          key: "users"
        },
        {
          title: "Books",
          key: "books"
        },
      ],
    },
    {
      title: "Borrowings",
      url: "#",
      items: [
        {
          title: "Borrows",
          key: "borrows"
        },
      ]
    },
  ],
}

export function AppSidebar({
  onNavigate,
  ...props
}) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-sidebar-border h-16 border-b">
        <NavUser user={data.user} />
      </SidebarHeader>

      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((head) => (
          <Collapsible
            key={head.title}
            title={head.title}
            defaultOpen
            className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm">
                <CollapsibleTrigger>
                  {head.title}
                  <ChevronRight
                    className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {head.items.map((tail) => (
                      <SidebarMenuItem key={tail.title}>
                        <SidebarMenuButton asChild isActive={tail.isActive}>
                          <button className="w-full" onClick={() => onNavigate(tail.key, head.title)}>
                            {tail.title}
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
      <SidebarRail />
    </Sidebar>
  );
}
