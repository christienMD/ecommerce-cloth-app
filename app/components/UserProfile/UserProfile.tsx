/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings, ShoppingBag, Loader2 } from "lucide-react";
import { getUserInitials } from "@/app/utils/getUserInitials";
import Link from "next/link";
import { handleLogOut } from "@/app/actions/auth/logout";
import { useState } from "react";
import { toast } from "react-toastify";
import { useToast } from "@/hooks/use-toast";


interface Props {
  name: string | null;
  email: string | null;
  image: string | null;
}

const UserProfile = ({ name, email, image }: Props) => {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [firstName, lastName] = (name ?? "").split(" ");
  const initials = getUserInitials(firstName, lastName);
  const { toast } = useToast();

    const handleSignOutClick = async () => {
      try {
        setIsSigningOut(true);
        toast({
          title: "👋 See you soon!",
          description: "You have been logged out successfully",
          variant: "success",
          className: "bg-green-50 border-green-200",
        });
        await handleLogOut();
      } catch (error) {
        console.error("Sign out failed:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to log out. Please try again.",
        });
        setIsSigningOut(false);
      }
    };

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <div className="link">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src={image || ""} alt={name || "User"} />
                <AvatarFallback className="bg-dress_realm-yellow text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
            <p className="text-xs">Hello, {firstName}</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 mt-2">
          <div className="flex items-center justify-start gap-2 p-2">
            <p className="font-medium">{name}</p>
          </div>
          <DropdownMenuSeparator />
          <div className="p-2">
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile" className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/orders" className="cursor-pointer">
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span>Orders</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-500 focus:text-red-500 cursor-pointer"
            onClick={handleSignOutClick}
            disabled={isSigningOut}
          >
            {isSigningOut ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="mr-2 h-4 w-4" />
            )}
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfile;
