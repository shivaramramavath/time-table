import { Moon, Settings, UserRound, SlidersHorizontal } from 'lucide-react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';

import ProfileAvatar from './ProfileAvatar';
import LogoutButton from './LogoutButton';
import { useUserStore } from '@/shared/user/user.store';
import { usePreferencesStore } from '@/shared/preferences/preferences.store';
import MenuItem from './MenuItem';
import MenuSection from './MenuSection';
import { navigationService } from '@/shared/services/navigation.service';
import NotificationMenuItem from './NotificationsMenuItem';

const Profile = () => {
  const user = useUserStore((state) => state.user);
  const darkMode = usePreferencesStore((state) => state.darkMode);
  const toggleDarkMode = usePreferencesStore((state) => state.toggleDarkMode);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ProfileAvatar />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-80 overflow-hidden rounded-2xl border-border/60 bg-popover p-0 shadow-xl"
      >
        {/* User */}
        <div className="flex items-center gap-3 border-b border-border/50 px-4 py-4">
          <ProfileAvatar />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{user?.userName ?? 'Guest User'}</p>

            <p className="truncate text-xs text-muted-foreground">
              {user?.email ?? 'No email available'}
            </p>
          </div>
        </div>

        {/* Notifications */}
        <div className="p-2">
          <NotificationMenuItem unreadCount={3} />
        </div>

        {/* Preferences */}
        <MenuSection title="Preferences">
          <MenuItem
            icon={Moon}
            label="Appearance"
            value={darkMode ? 'Dark' : 'Light'}
            onClick={toggleDarkMode}
          />

          <MenuItem
            icon={SlidersHorizontal}
            label="Preferences"
            onClick={() => navigationService.navigate('/preferences')}
          />
        </MenuSection>

        {/* Account */}
        <MenuSection title="Account">
          <MenuItem
            icon={UserRound}
            label="Profile"
            onClick={() => navigationService.navigate('/profile')}
          />

          <MenuItem
            icon={Settings}
            label="Settings"
            onClick={() => navigationService.navigate('/settings')}
          />
        </MenuSection>

        {/* Logout */}
        <div className="border-t border-border/50 p-2">
          <LogoutButton />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
