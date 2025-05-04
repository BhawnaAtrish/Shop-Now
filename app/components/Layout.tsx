'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-[#121212]">
      <Sidebar isExpanded={isSidebarExpanded} onExpandedChange={setIsSidebarExpanded} />
      <Topbar isSidebarExpanded={isSidebarExpanded} />
      <main className={`transition-all duration-300 ${isSidebarExpanded ? 'pl-[200px]' : 'pl-[80px]'} pt-[70px]`}>
        {children}
      </main>
    </div>
  );
};

export default Layout; 