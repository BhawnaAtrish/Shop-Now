'use client';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col">
      <Sidebar isExpanded={isSidebarExpanded} onExpandedChange={setIsSidebarExpanded} />
      <Topbar isSidebarExpanded={isSidebarExpanded} />
      <main className={`transition-all duration-300 ${isSidebarExpanded ? 'pl-[200px]' : 'pl-[80px]'} pt-[70px] flex-grow`}>
        {children}
      </main>
      <div className={`transition-all duration-300 ${isSidebarExpanded ? 'pl-[200px]' : 'pl-[80px]'}`}>
        <Footer />
      </div>
    </div>
  );
} 