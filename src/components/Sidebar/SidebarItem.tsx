import { LucideIcon } from 'lucide-react';

type Props = {
  label: string;
  icon: LucideIcon;
  isExpanded: boolean;
  hasNotification?: boolean;
};

const SidebarItem = ({ label, icon: Icon, isExpanded, hasNotification }: Props) => {
  return (
    <div className="relative group flex items-center gap-4 p-2 rounded-md hover:bg-gray-700 cursor-pointer">
      <Icon className="w-5 h-5" />
      {hasNotification && (
        <span className="absolute top-1 left-5 w-2 h-2 bg-red-500 rounded-full" />
      )}
      {isExpanded && <span className="text-sm">{label}</span>}
    </div>
  );
};

export default SidebarItem;
