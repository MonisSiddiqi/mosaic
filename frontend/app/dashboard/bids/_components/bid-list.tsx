"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  CheckCircle,
  Clock,
  Download,
  Eye,
  MoreHorizontal,
  Paperclip,
  XCircle,
} from "lucide-react";

// Dummy data based on the Prisma schema
const bids = [
  {
    id: "bid-1",
    projectId: "project-1",
    projectTitle: "Modern Kitchen Renovation",
    clientName: "John Smith",
    status: "PENDING",
    proposalMessage:
      "I can complete this project within 3 weeks with high-quality materials.",
    proposalAttachment: "kitchen-proposal.pdf",
    createdAt: "2023-11-15T10:30:00Z",
    updatedAt: "2023-11-15T10:30:00Z",
    attachments: [
      { id: "att-1", name: "Cost Breakdown", url: "/files/cost-breakdown.pdf" },
      { id: "att-2", name: "Timeline", url: "/files/timeline.pdf" },
    ],
  },
  {
    id: "bid-2",
    projectId: "project-2",
    projectTitle: "Bathroom Remodeling",
    clientName: "Sarah Johnson",
    status: "ACCEPTED",
    proposalMessage:
      "I specialize in bathroom remodeling and can deliver exceptional results.",
    proposalAttachment: "bathroom-proposal.pdf",
    createdAt: "2023-11-10T14:45:00Z",
    updatedAt: "2023-11-12T09:15:00Z",
    attachments: [
      { id: "att-3", name: "Materials List", url: "/files/materials.pdf" },
    ],
  },
  {
    id: "bid-3",
    projectId: "project-3",
    projectTitle: "Backyard Landscaping",
    clientName: "Michael Brown",
    status: "REJECTED",
    proposalMessage:
      "I can transform your backyard into a beautiful outdoor space.",
    proposalAttachment: "landscape-proposal.pdf",
    createdAt: "2023-11-05T11:20:00Z",
    updatedAt: "2023-11-08T16:30:00Z",
    attachments: [],
  },
  {
    id: "bid-4",
    projectId: "project-4",
    projectTitle: "Home Office Setup",
    clientName: "Emily Davis",
    status: "PENDING",
    proposalMessage:
      "I can create an ergonomic and productive home office space.",
    proposalAttachment: "office-proposal.pdf",
    createdAt: "2023-11-18T09:10:00Z",
    updatedAt: "2023-11-18T09:10:00Z",
    attachments: [
      { id: "att-4", name: "Design Mockup", url: "/files/design.pdf" },
      { id: "att-5", name: "Equipment List", url: "/files/equipment.pdf" },
    ],
  },
  {
    id: "bid-5",
    projectId: "project-5",
    projectTitle: "Roof Replacement",
    clientName: "Robert Wilson",
    status: "ACCEPTED",
    proposalMessage:
      "I offer quality roof replacement with a 10-year warranty.",
    proposalAttachment: "roof-proposal.pdf",
    createdAt: "2023-11-08T13:25:00Z",
    updatedAt: "2023-11-11T10:45:00Z",
    attachments: [
      {
        id: "att-6",
        name: "Material Options",
        url: "/files/roofing-materials.pdf",
      },
    ],
  },
];

export function BidList() {
  const [selectedBid, setSelectedBid] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBids = bids.filter((bid) => {
    const matchesStatus = filterStatus === "all" || bid.status === filterStatus;
    const matchesSearch =
      bid.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bid.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleViewBid = (bid: any) => {
    setSelectedBid(bid);
  };

  const handleCloseBidDetails = () => {
    setSelectedBid(null);
  };

  const getStatusBadge = (status: any) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge
            variant="outline"
            className="flex items-center gap-1 border-amber-200 bg-amber-50 text-amber-500"
          >
            <Clock className="h-3 w-3" /> Pending
          </Badge>
        );
      case "ACCEPTED":
        return (
          <Badge
            variant="outline"
            className="flex items-center gap-1 border-green-200 bg-green-50 text-green-500"
          >
            <CheckCircle className="h-3 w-3" /> Accepted
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge
            variant="outline"
            className="flex items-center gap-1 border-red-200 bg-red-50 text-red-500"
          >
            <XCircle className="h-3 w-3" /> Rejected
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="flex flex-col justify-between gap-4 border-b p-4 md:flex-row">
        <div className="flex flex-col gap-4 md:flex-row">
          <Input
            placeholder="Search projects or clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-80"
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="ACCEPTED">Accepted</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-5">Project</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Attachments</TableHead>
            <TableHead className="pr-5 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBids.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-8 text-center text-muted-foreground"
              >
                No bids found matching your criteria
              </TableCell>
            </TableRow>
          ) : (
            filteredBids.map((bid) => (
              <TableRow key={bid.id}>
                <TableCell className="ml-5 pl-5 font-medium">
                  {bid.projectTitle}
                </TableCell>
                <TableCell>{bid.clientName}</TableCell>
                <TableCell>{getStatusBadge(bid.status)}</TableCell>
                <TableCell>{formatDate(bid.createdAt)}</TableCell>
                <TableCell>
                  {bid.attachments.length > 0 ? (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Paperclip className="h-3 w-3" />
                      {bid.attachments[0].name}
                    </Badge>
                  ) : (
                    <span className="text-sm text-muted-foreground">None</span>
                  )}
                </TableCell>
                <TableCell className="pr-5 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewBid(bid)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download Proposal
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {selectedBid && (
        <Dialog open={!!selectedBid} onOpenChange={handleCloseBidDetails}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Bid Details</DialogTitle>
              <DialogDescription>
                Submitted on {formatDate(selectedBid.createdAt)}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <h3 className="text-lg font-semibold">
                  {selectedBid.projectTitle}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Status:</span>
                  {getStatusBadge(selectedBid.status)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Client:</span>
                  <span>{selectedBid.clientName}</span>
                </div>
              </div>

              <div className="grid gap-2">
                <h4 className="font-medium">Proposal Message</h4>
                <p className="text-sm">{selectedBid.proposalMessage}</p>
              </div>

              {selectedBid.attachments.length > 0 && (
                <div className="grid gap-2">
                  <h4 className="font-medium">Attachments</h4>
                  <div className="grid gap-2">
                    {selectedBid.attachments.map((attachment: any) => (
                      <div
                        key={attachment.id}
                        className="flex items-center gap-2 rounded-md border p-2"
                      >
                        <Paperclip className="h-4 w-4 text-muted-foreground" />
                        <span>{attachment.name}</span>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid gap-2">
                <h4 className="font-medium">Timeline</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Submitted:</span>
                    <span>{formatDate(selectedBid.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span>{formatDate(selectedBid.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
