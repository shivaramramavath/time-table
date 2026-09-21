import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { useUserStore } from '@/shared/user/user.store';

const ProfileAvatar = () => {
  const user = useUserStore((s) => s.user);

  const fallbackText = user?.userName?.charAt(0)?.toUpperCase() || 'U';

  return (
    <div className="relative">
      <Avatar className="cursor-pointer">
        <AvatarImage src={user?.avatar || ''} alt={user?.userName || 'User avatar'} />
        <AvatarFallback>{fallbackText}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default ProfileAvatar;
