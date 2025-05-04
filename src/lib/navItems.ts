// lib/navItems.ts
import {
    Home,
    Mail,
    Store,
    CreditCard,
    Trophy,
    Settings,
    LogOut,
  } from 'lucide-react';
  
  export const navItems = [
    { label: 'Home', icon: Home },
    { label: 'Messages', icon: Mail, hasNotification: true },
    { label: 'Game Store', icon: Store },
    { label: 'Payments', icon: CreditCard },
    { label: 'Leaderboard', icon: Trophy },
  ];
  
  export const bottomNavItems = [
    { label: 'Settings', icon: Settings },
    { label: 'Logout', icon: LogOut },
  ];
  