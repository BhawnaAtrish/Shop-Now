"use client";
import Link from "next/link";
import {
  IconHome,
  IconShoppingBag,
  IconTrophy,
  IconFolder,
  IconDeviceGamepad2,
  IconSettings,
  IconRefresh,
  IconLogout,
  IconHeart,
  IconTag,
  IconHelp,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isExpanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}

const Sidebar = ({ isExpanded, onExpandedChange }: SidebarProps) => {
  const router = useRouter();

  return (
    <div
      className={`fixed left-0 top-0 h-screen ${
        isExpanded ? "bg-[#3D352A80]" : "bg-[#1A1A1A]"
      } flex flex-col items-start py-4 transition-all duration-300 ${
        isExpanded ? "w-[200px]" : "w-[80px]"
      }`}
      onMouseEnter={() => onExpandedChange(true)}
      onMouseLeave={() => onExpandedChange(false)}
    >
      <div className="mb-8 px-6">
        <Link href="/" className="flex items-center gap-3">
          {isExpanded ? (
            <span className="font-['Press_Start_2P'] font-normal text-[38px] leading-[100%] tracking-normal text-center text-[#DAB785]">
              ShopNow
            </span>
          ) : (
            <span className="font-['Press_Start_2P'] font-normal text-[38px] leading-[100%] tracking-normal text-center text-[#DAB785]">
              SN
            </span>
          )}
        </Link>
      </div>

      <nav className="flex flex-col gap-2 w-full">
        <NavItem
          href="/landing-page"
          icon={<IconHome size={22} />}
          label="Home"
          isExpanded={isExpanded}
        />
        <NavItem
          href="/products"
          icon={<IconShoppingBag size={22} />}
          label="Products"
          isExpanded={isExpanded}
        />
        <NavItem
          href="/landing-page"
          icon={<IconHeart size={22} />}
          label="Wishlist"
          isExpanded={isExpanded}
        />
        <NavItem
          href="/landing-page"
          icon={<IconTag size={22} />}
          label="Offers"
          isExpanded={isExpanded}
        />
        <NavItem
          href="/landing-page"
          icon={<IconHelp size={22} />}
          label="Help"
          isExpanded={isExpanded}
        />
      </nav>

      <div className="mt-auto flex flex-col gap-2 w-full">
        <NavItem
          href="/landing-page"
          icon={<IconSettings size={22} />}
          label="Settings"
          isExpanded={isExpanded}
        />
        <NavItem
          href="/logout"
          icon={<IconLogout size={22} />}
          label="Logout"
          isExpanded={isExpanded}
          onClick={(e) => {
            e.preventDefault(); // next/router navigation rokne ke liye
            localStorage.clear();
            router.push("/login"); // manually navigate
          }}
        />
      </div>
    </div>
  );
};

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isExpanded: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const NavItem = ({ href, icon, label, isExpanded, onClick }: NavItemProps) => {
  return (
    <Link href={href} legacyBehavior>
      <a
        onClick={onClick}
        className={`flex items-center gap-3 text-gray-400 hover:text-white transition-colors px-6 py-2 w-full hover:bg-[#2A2A2A] group`}
      >
        <span className="min-w-[24px] flex items-center">{icon}</span>
        {isExpanded && (
          <span className="text-[15px] font-medium whitespace-nowrap">
            {label}
          </span>
        )}
      </a>
    </Link>
  );
};

export default Sidebar;
