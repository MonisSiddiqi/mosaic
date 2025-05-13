import { ScrollArea } from "@/components/ui/scroll-area";
import { Header } from "./_components/header";
// import { Footer } from "./_components/footer";
// import { BottomCta } from "./_components/bottom-cta";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex max-h-screen min-h-screen flex-1 flex-col justify-between overflow-hidden">
      <Header />
      <ScrollArea className="h-screen w-screen">
        {children}
        {/* <BottomCta />
        <Footer /> */}
      </ScrollArea>
    </div>
  );
}
