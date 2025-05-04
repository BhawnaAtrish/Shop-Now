"use client";
import {
  IconSearch,
  IconBell,
  IconShoppingBag,
  IconUser,
  IconCircleFilled,
  IconMessage,
  IconGift,
  IconTrophy,
} from "@tabler/icons-react";
import { useState } from "react";
import Link from "next/link";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { usePathname } from "next/navigation";

interface TopbarProps {
  isSidebarExpanded: boolean;
  onSearch?: (query: string) => void;
}

const notifications = [
  {
    id: 1,
    type: "message",
    title: "New Message",
    description: "John sent you a message",
    time: "2 min ago",
    icon: <IconMessage className="text-blue-400" size={16} />,
  },
  {
    id: 2,
    type: "gift",
    title: "Game Gift",
    description: "You received Cyberpunk 2077",
    time: "1 hour ago",
    icon: <IconGift className="text-purple-400" size={16} />,
  },
  {
    id: 3,
    type: "achievement",
    title: "Achievement Unlocked",
    description: "You completed all daily tasks",
    time: "2 hours ago",
    icon: <IconTrophy className="text-yellow-400" size={16} />,
  },
];

const Topbar = ({ isSidebarExpanded, onSearch }: TopbarProps) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div
      className={`fixed top-0 transition-all duration-300 ${
        pathname.startsWith("/products")
          ? "left-0"
          : isSidebarExpanded
          ? "left-[200px]"
          : "left-[80px]"
      } right-0 h-[70px] bg-[#0F0F0F] flex items-center justify-between px-8 z-[9999] border-b border-[#1F1F1F]`}
    >
      <div className="flex items-center gap-12 w-full">
        <nav
          className={`flex items-center gap-8 w-full ${
            pathname.startsWith("/products") ? "justify-start" : ""
          }`}
        >
          {pathname.startsWith("/products") && (
            <>
              <span className="font-['Press_Start_2P'] font-normal text-[38px] leading-[100%] tracking-normal text-center text-[#DAB785]">
                SN
              </span>
              <span className="ml-10"></span>
            </>
          )}
          <Link
            href="/"
            className="font-poppins font-medium text-[18px] px-4 py-1"
          >
            Home
          </Link>
          <span className="h-5 border-l border-[#44423D]"></span>
          <Link
            href="/products"
            className="font-poppins font-medium text-[18px] px-4 py-1"
          >
            Products
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <IconSearch
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
            size={20}
            strokeWidth={2}
          />
          <input
            type="text"
            placeholder="What are you looking for?"
            value={searchValue}
            onChange={handleSearchChange}
            className="bg-[#1A1A1A] text-[12px] text-white pl-11 pr-4 py-2.5 rounded-full w-[400px] focus:outline-none focus:ring-1 focus:ring-[#2A2A2A] placeholder-[#FFFFFFCC] placeholder-font-normal border border-white shadow-[0_0_0_2px_rgba(255,255,255,0.15)]"
          />
        </div>

        <span className="h-5 border-l border-[#44423D]"></span>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#FFFFFFCC] hover:text-white transition-colors hover:bg-[#2A2A2A] border border-white"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <IconBell size={20} strokeWidth={1.5} fill="#FFFFFFCC" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                3
              </span>
            </button>

            {isNotificationOpen && (
              <div className="absolute top-14 right-0 w-[320px] bg-[#1A1A1A] rounded-lg border border-[#ffffff15] shadow-lg z-[9999]">
                <div className="p-4 border-b border-[#ffffff15]">
                  <h3 className="text-white font-medium">Notifications</h3>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 border-b border-[#ffffff15] hover:bg-[#2A2A2A] transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{notification.icon}</div>
                        <div className="flex-1">
                          <h4 className="text-white text-sm font-medium">
                            {notification.title}
                          </h4>
                          <p className="text-[#6C6C6C] text-sm mt-1">
                            {notification.description}
                          </p>
                          <span className="text-[#6C6C6C] text-xs mt-2 block">
                            {notification.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 flex justify-center border-t border-[#ffffff15]">
                  <button className="text-[#6C6C6C] text-sm hover:text-white transition-colors">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          <span className="h-5 border-l border-[#44423D]"></span>

          <button className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#FFFFFFCC] hover:text-white transition-colors hover:bg-[#2A2A2A] border border-white">
            <IconShoppingBag size={20} strokeWidth={1.5} fill="#FFFFFFCC" />
          </button>

          <span className="h-5 border-l border-[#44423D]"></span>

          <button className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#FFFFFFCC] hover:text-white transition-colors hover:bg-[#2A2A2A] border border-white">
            <IconUser size={20} strokeWidth={1.5} fill="#FFFFFFCC" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
