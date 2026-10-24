"use client";

import { LogOut, MessageSquareText, UserRound } from "lucide-react";

import { authService } from "@/features/auth/services/auth.service";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/components/ui/hover-card";
import { Separator } from "@/shared/components/ui/separator";
import { useUserStore } from "@/shared/user/user.store";
import Link from "next/link";

const ProfileMenu = () => {
  const user = useUserStore((state) => state.user);
  return (
    <HoverCard openDelay={100} closeDelay={200}>
      <HoverCardTrigger
        render={
          <button
            type="button"
            aria-label="Open profile menu"
            className="rounded-full transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        }
      >
        <Avatar className="size-9 border border-white/15">
          <AvatarImage src="/images/avatar.png" alt="Profile" />
          <AvatarFallback className="bg-white/10 text-xs text-white">
            SR
          </AvatarFallback>
        </Avatar>
      </HoverCardTrigger>

      <HoverCardContent
        align="end"
        side="bottom"
        sideOffset={10}
        className="w-[268px] rounded-2xl border-white/10 bg-[#0b0b0b] p-3 text-white shadow-xl"
      >
        <div className="flex items-center gap-3">
          <Avatar className="size-10 border border-white/10">
            <AvatarImage src="/images/avatar.png" alt="Profile" />
            <AvatarFallback className="bg-white/10 text-xs text-white">
              {user?.userName
                .split(" ")
                .map((name) => name[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{user?.userName}</p>
            <p className="truncate text-xs text-white/45">{user?.email}</p>
          </div>
        </div>

        <Separator className="my-3 bg-white/10" />

        <nav className="space-y-1">
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-white/65 transition-colors hover:bg-white/5 hover:text-white"
          >
            <UserRound className="size-4" />
            <span>Profile</span>
          </Link>

          <Link
            href="/feedback"
            className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-white/65 transition-colors hover:bg-white/5 hover:text-white"
          >
            <MessageSquareText className="size-4" />
            <span>Feedback</span>
          </Link>

          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm text-white/65 transition-colors hover:bg-destructive-muted/40 hover:text-destructive"
            onClick={() => {
              authService.signout();
            }}
          >
            <LogOut className="size-4" />
            <span>Log out</span>
          </button>
        </nav>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ProfileMenu;
