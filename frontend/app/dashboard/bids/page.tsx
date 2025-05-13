import { PageHeader } from "./_components/bids-page-header";
import { ExpiredPlanNotice } from "./_components/expired-plan-notice";
import { BidsTable } from "./_components/table/table";

export default function VendorBidsPage() {
  return (
    <div className="container mx-auto space-y-6 bg-white p-4">
      <PageHeader
        title="Manage Bids"
        description="View and manage all your project bids in one place"
      />

      <BidsTable />

      <ExpiredPlanNotice />
    </div>
  );
}
