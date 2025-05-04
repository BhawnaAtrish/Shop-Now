// components/layout/MainLayout.tsx
import Sidebar from "../Sidebar/Sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-16 md:ml-56 pt-16 p-4">
  {children}
</main>    </div>
  );
};

export default MainLayout;
