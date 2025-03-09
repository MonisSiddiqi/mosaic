import { BidList } from "./_components/bid-list";
import { BidStats } from "./_components/bid-status";
import { PageHeader } from "./_components/bids-page-header";

export default function VendorBidsPage() {
  return (
    <div className="container mx-auto space-y-6 bg-white p-4">
      <PageHeader
        title="Manage Bids"
        description="View and manage all your project bids in one place"
      />

      <BidStats />

      <div className="rounded-lg border bg-white">
        <BidList />
      </div>
    </div>
  );
}
