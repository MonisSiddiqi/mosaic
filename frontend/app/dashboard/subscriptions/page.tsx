import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BoxIcon, PuzzleIcon } from "lucide-react";
import { AllPlansTable } from "./-components/table/table";

export default function SubscriptionsPage() {
  return (
    <Tabs defaultValue="plans" className="rounded bg-white p-5">
      <TabsList className="mb-5 grid h-12 w-full max-w-screen-md grid-cols-2">
        <TabsTrigger
          value="plans"
          className="h-10 gap-2 data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
        >
          <BoxIcon className="size-5" /> Subscription Plans
        </TabsTrigger>
        <TabsTrigger
          value="coupons"
          className="h-10 gap-2 data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-700"
        >
          <PuzzleIcon className="size-4" /> Coupons
        </TabsTrigger>
      </TabsList>
      <TabsContent value="plans">
        <AllPlansTable />
      </TabsContent>
      <TabsContent value="coupons"></TabsContent>
    </Tabs>
  );
}
