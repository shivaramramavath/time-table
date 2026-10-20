"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";

const ProfileMenu = () => {
  return (
    <button
      type="button"
      aria-label="Open profile menu"
      className="rounded-full transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2"
    >
      <Avatar className="size-10 border border-white/15">
        <AvatarImage src="/images/avatar.png" alt="Profile" />
        <AvatarFallback className="bg-white/10 text-xs text-white">
          SR
        </AvatarFallback>
      </Avatar>
    </button>
  );
};

export default ProfileMenu;
