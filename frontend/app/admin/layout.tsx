import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar } from "@/app/admin/-components/sidebar";
import { Header } from "@/app/admin/-components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <ScrollArea className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
          {children}
        </ScrollArea>
      </div>
    </div>
  );
}
