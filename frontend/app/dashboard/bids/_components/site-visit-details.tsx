import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";

export type UserDetails = {
  email: string;
  phone: string | null;
  name: string | null;
  image: string | null;
};

interface SiteVisitDetailsProps {
  user: UserDetails;
  projectName: string;
}

export default function SiteVisitDetails({
  user,
  projectName,
}: SiteVisitDetailsProps) {
  const handlePhoneCall = () => {
    if (user.phone) {
      window.open(`tel:${user.phone}`, "_self");
    }
  };

  const handleEmail = () => {
    window.open(`mailto:${user.email}`, "_self");
  };

  return (
    <Card className="bg-gradient-to-b from-blue-50 to-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Site Visit Details</CardTitle>
            <CardDescription>
              Contact homeowner for{" "}
              <span className="font-medium">{projectName}</span> project
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Important:</strong> After your site visit, you must return
            to this platform and either accept or reject this bid. Leaving bids
            pending will reduce your vendor rating and may affect future bid
            opportunities.
          </AlertDescription>
        </Alert>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <MapPin className="h-5 w-5 text-blue-600" />
            Homeowner Contact Details
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              {user.name && (
                <div>
                  <p className="text-lg font-medium">{user.name}</p>
                  <p className="text-sm text-gray-600">Project Owner</p>
                </div>
              )}

              {user.image && (
                <img
                  src={user.image}
                  alt={user.name || "User Avatar"}
                  className="h-12 w-12 rounded-full object-cover"
                />
              )}
            </div>

            <div className="grid gap-4">
              {user.phone && (
                <div className="flex flex-col justify-between gap-4 rounded-lg border bg-white p-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="line-clamp-1 font-medium">{user.phone}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-600">Phone</p>
                        {
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-xs text-green-700"
                          >
                            Call
                          </Badge>
                        }
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={handlePhoneCall}
                    type="button"
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Call Now
                  </Button>
                </div>
              )}

              <div className="flex flex-col justify-between gap-4 rounded-lg border bg-white p-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div className="w-full max-w-full overflow-hidden">
                    <p className="line-clamp-1 font-medium">
                      {user.email.length > 20
                        ? user.email.slice(20) + "..."
                        : user.email}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-600">Email</p>
                      {
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-xs text-blue-700"
                        >
                          Mail
                        </Badge>
                      }
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleEmail}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="bg-sky-700 text-white hover:bg-sky-800 hover:text-white"
                >
                  Send Email
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
          <h4 className="mb-2 font-semibold text-blue-900">
            Site Visit Instructions:
          </h4>
          <ul className="ml-4 list-disc text-sm text-blue-800 [&>li]:mt-1">
            <li>Contact the homeowner to schedule a convenient time</li>
            <li>Conduct a thorough site assessment</li>
            <li>Discuss project requirements and expectations</li>
            <li>
              Come back to the platform and Either Accept or Reject this bid
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
