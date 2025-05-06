"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@/context/UserContext";
import {
  CoinsIcon,
  Compass,
  Home,
  Instagram,
  PlusSquare,
  User
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Explore",
    href: "/explore",
    icon: Compass,
  },
  {
    title: "Create",
    href: "/create",
    icon: PlusSquare,
  },
  {
    title: "Mint",
    href: "/mint",
    icon: CoinsIcon,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
];

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const [activePath, setActivePath] = useState("/");
  const { user } = useUser();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setCollapsed(window.innerWidth < 1024 && window.innerWidth >= 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNavigation = (path: string) => {
    setActivePath(path);

    if (path === "/profile") {
      if (!user?.name) return;
      router.push(`/${user?.name}`);
      return;
    }
    router.push(path);
  };

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background h-16">
        <div className="flex items-center justify-around h-full px-2">
          {navLinks.map((link) => {
            const isActive = activePath === link.href;
            return (
              <Button
                key={link.href}
                variant="ghost"
                className={`flex flex-col items-center justify-center flex-1 h-full ${isActive ? "text-primary" : "text-muted-foreground"}`}
                onClick={() => handleNavigation(link.href)}
              >
                <link.icon className="h-20 w-20" />
              </Button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed top-0 left-0 h-screen z-50 flex flex-col border-r bg-background transition-all duration-300 ${collapsed ? "w-16" : "w-64"
        }`}
    >
      <div className="flex h-14 items-center px-4 my-5">
        {collapsed ? (
          <Button
            variant="ghost"
            className="h-9 w-9 p-0"
            onClick={() => setCollapsed(false)}
          >
            <Instagram className="h-6 w-6" />
          </Button>
        ) : (
          <div className="flex items-center gap-2 pl-2">
            <span className="text-3xl font-semibold">echover</span>
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 pt-2">
        <div className="px-3 py-2">
          <TooltipProvider>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activePath === link.href;
                return (
                  <Tooltip key={link.href}>
                    <TooltipTrigger asChild>
                      <div
                        className={`cursor-pointer flex h-16 w-full justify-start items-center gap-3 rounded-md px-3 ${isActive ? "bg-secondary" : "hover:bg-accent"
                          } ${collapsed && "justify-center px-0"}`}
                        onClick={() => handleNavigation(link.href)}
                      >
                        <link.icon className={`h-full ${isActive && "font-bold"}`} />
                        {!collapsed && <span className="font-semibold text-lg">{link.title}</span>}
                      </div>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right" className="border bg-popover text-popover-foreground">
                        {link.title}
                      </TooltipContent>
                    )}
                  </Tooltip>
                );
              })}
            </nav>
          </TooltipProvider>
        </div>
      </ScrollArea>
    </div>
  );
}