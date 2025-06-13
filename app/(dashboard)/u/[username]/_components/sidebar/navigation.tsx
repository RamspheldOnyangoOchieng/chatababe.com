"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Fullscreen, User, MessageSquare, Users } from "lucide-react";

import NavItem, { NavItemSkeleton } from "./nav-item";

const Navigation = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const routes = [
    {
      label: "Profile",
      href: `/u/${user?.username}`,
      icon: Fullscreen,
    },
    {
      label: "Stream",
      href: `/u/${user?.username}/stream`,
      icon: User,
    },
    {
      label: "Chat Control",
      href: `/u/${user?.username}/chat`,
      icon: MessageSquare,
    },
    {
      label: "Community",
      href: `/u/${user?.username}/community`,
      icon: Users,
    },
  ];

  if (!user?.username) {
    return (
      <ul className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <NavItemSkeleton key={i} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
};

export default Navigation;
