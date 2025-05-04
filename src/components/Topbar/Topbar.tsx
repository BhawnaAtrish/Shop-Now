import { Search, Bell, ShoppingBag, CircleUser } from 'lucide-react';

const Topbar = () => {
  return (
    <div className="w-full flex items-center justify-between bg-black text-white px-6 py-3">
      <div className="flex gap-6 items-center">
        <span>Home</span>
        <span>Game Store</span>
        <span>Leaderboard</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center border border-gray-600 px-2 py-1 rounded-full">
          <Search size={16} className="mr-2" />
          <input
            type="text"
            placeholder="What are you looking for?"
            className="bg-transparent outline-none text-sm"
          />
        </div>

        <div className="relative">
          <Bell />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        </div>
        <ShoppingBag />
        <CircleUser />
      </div>
    </div>
  );
};

export default Topbar;
