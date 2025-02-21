"use client";

import {
  Sidebar as ShadCNSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  BadgeCheck,
  Bell,
  Calendar,
  ChartPie,
  ChevronsUpDownIcon,
  CreditCard,
  GalleryVerticalEnd,
  Home,
  Inbox,
  LayoutDashboard,
  LayoutTemplateIcon,
  LifeBuoy,
  Link,
  Link2,
  LogOut,
  MessageCircleQuestion,
  Plug,
  Search,
  Send,
  Settings,
  Sparkles,
  Workflow,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { handleSignOut } from "@/app/actions/sign-out";

// Menu items.
const items = [
  {
    title: "Links",
    url: "/dashboard",
    icon: Link,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: ChartPie,
  },
  {
    title: "Templates",
    url: "/templates",
    icon: LayoutTemplateIcon,
  },
  {
    title: "Integrations",
    url: "/integrations",
    icon: Plug,
  },
  // {
  //   title: "Help",
  //   url: "/help",
  //   icon: MessageCircleQuestion,
  // },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const secondaryNav = [
  {
    title: "Support",
    url: "/support",
    icon: LifeBuoy,
  },
  {
    title: "Feedback",
    url: "/feedback",
    icon: Send,
  },
];

const user = {
  name: "João Pedro A.",
  email: "jaaopbr@gmail.com",
  avatar: "https://www.github.com/7cass.png",
};

export function Sidebar() {
  return (
    <ShadCNSidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Link className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Plutus</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <ProFreeTrialCard />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </ShadCNSidebar>
  );
}

interface SidebarUserProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}

function ProFreeTrialCard() {
  const { state } = useSidebar();

  return (
    <SidebarGroup
      className={cn(["mt-auto", state === "collapsed" && "invisible"])}
    >
      <Card className="shadow-none">
        <form>
          <CardHeader className="p-4 pb-0">
            <CardTitle className="text-sm">
              Experimente o PRO por 7 dias!
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2.5 p-4">
            <Button
              className="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none"
              size="sm"
            >
              Upgrade
            </Button>
          </CardContent>
        </form>
      </Card>
    </SidebarGroup>
  );
}

function SidebarUser({ user }: SidebarUserProps) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">JP</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDownIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-sidebar w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles size="1rem" />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck size="1rem" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard size="1rem" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell size="1rem" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleSignOut()}>
              <LogOut size="1rem" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
