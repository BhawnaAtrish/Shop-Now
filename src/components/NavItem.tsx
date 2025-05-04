// components/NavItem.tsx
'use client';

import { LucideIcon } from 'lucide-react';
import { FC } from 'react';
// import clsx from 'clsx';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  expanded: boolean;
  hasNotification?: boolean;
}

const NavItem: FC<NavItemProps> = ({ icon: Icon, label, expanded, hasNotification }) => {
  return (
    <div className="relative flex items-center gap-4 text-white px-4 py-3 hover:bg-white/10 cursor-pointer rounded-md">
      <Icon className="h-5 w-5" />
      {expanded && <span className="text-sm">{label}</span>}
      {hasNotification && (
        <span className="absolute top-2 left-5 h-2 w-2 bg-red-500 rounded-full" />
      )}
    </div>
  );
};

export default NavItem;
