import Topbar from "@/components/Topbar/Topbar";
import "./globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";

export const metadata = {
  title: "GameQuest",
  description: "Gaming dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <main className="flex-1 bg-gray-100 min-h-screen">
          <Topbar />
          <div className="p-6">{children}</div>
        </main>
      </body>
    </html>
  );
}
