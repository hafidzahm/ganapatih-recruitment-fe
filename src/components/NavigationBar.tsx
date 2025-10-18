"use client";

import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";
import ButtonComponent from "./ButtonComponent";
import { http } from "@/utils/axios";
import { House, Search, User } from "lucide-react";

import AddStatusForm from "./AddStatusForm";

export default function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();
  async function logout() {
    try {
      const response = await http.get("/logout");
      console.log({ response });
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log({ error });
    }
  }
  return (
    <NavigationMenu className="w-full h-15 max-w-screen fixed bottom-0 z-50 lg:sticky lg:top-0">
      <NavigationMenuList>
        <NavigationMenuItem>
          <AddStatusForm />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to={location.pathname === "/search" ? "/feed" : "/search"}>
            <ButtonComponent variant={"neutral"}>
              {location.pathname === "/search" ? (
                <>
                  <House />
                </>
              ) : (
                <>
                  <Search />
                </>
              )}
            </ButtonComponent>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to={location.pathname === "/me" ? "/feed" : "/me"}>
            <ButtonComponent variant={"neutral"}>
              {location.pathname === "/me" ? (
                <>
                  <House />
                </>
              ) : (
                <>
                  <User />
                </>
              )}
            </ButtonComponent>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <ButtonComponent
            type="button"
            handleClick={logout}
            text="Logout"
            variant={"neutral"}
          />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  className,
  title,
  children,
  ...props
}: React.ComponentProps<"a">) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "hover:bg-accent block text-main-foreground select-none space-y-1 rounded-base border-2 border-transparent p-3 leading-none no-underline outline-hidden transition-colors hover:border-border",
            className
          )}
          {...props}
        >
          <div className="text-base font-heading leading-none">{title}</div>
          <p className="font-base line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
}
ListItem.displayName = "ListItem";
