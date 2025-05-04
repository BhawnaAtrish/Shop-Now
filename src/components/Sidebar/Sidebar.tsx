'use client';

import { useState } from 'react';
import {
  Home, Mail, Store, CreditCard, Trophy,
  Settings, LogOut, Menu
} from 'lucide-react';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile toggle
  const [isHovered, setIsHovered] = useState(false); // desktop hover

  const navItems = [
    { label: 'Home', icon: Home },
    { label: 'Messages', icon: Mail, hasNotification: true },
    { label: 'Game Store', icon: Store },
    { label: 'Payments', icon: CreditCard },
    { label: 'Leaderboard', icon: Trophy },
  ];

  const settingsItems = [
    { label: 'Settings', icon: Settings },
    { label: 'Logout', icon: LogOut },
  ];

  const isExpanded = isHovered || isOpen;

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden p-2">
        <Menu onClick={() => setIsOpen(!isOpen)} className="text-white" />
      </div>

      {/* Sidebar */}
      <aside
         className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] bg-[#121212] text-white 
            transition-all duration-300 ease-in-out
            ${isExpanded ? 'w-56' : 'w-16'}
            hidden md:flex flex-col
          `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo */}
        <div className="text-center py-6 font-bold text-2xl tracking-wide">
          {isExpanded ? 'ShopNow' : 'SN'}
        </div>

        {/* Main Items */}
        <nav className="flex-1 px-2 space-y-2">
          {navItems.map((item) => (
            <SidebarItem key={item.label} {...item} isExpanded={isExpanded} />
          ))}
        </nav>

        {/* Settings */}
        <div className="px-2 py-4 border-t border-gray-700">
          {settingsItems.map((item) => (
            <SidebarItem key={item.label} {...item} isExpanded={isExpanded} />
          ))}
        </div>
      </aside>

      {/* Expandable sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsOpen(false)}>
          <aside className="w-56 h-full bg-[#88847f] text-white p-4">
            <div className="font-bold text-xl mb-6">GameQuest</div>
            {[...navItems, ...settingsItems].map((item) => (
              <SidebarItem key={item.label} {...item} isExpanded={true} />
            ))}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
