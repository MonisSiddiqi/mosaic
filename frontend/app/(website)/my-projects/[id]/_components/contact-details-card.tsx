import { User, UserProfile, UserRole } from "@/apis/users";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { FC } from "react";

type Props = {
  user: User & { UserProfile: UserProfile };
};

export const ContactDetailsCard: FC<Props> = ({ user }) => {
  const handlePhoneCall = (phone: string) => {
    if (phone) {
      window.open(`tel:${phone}`, "_self");
    }
  };

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}`, "_self");
  };
  return (
    <div className="w-full overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-4">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
        <MapPinIcon className="h-5 w-5 text-blue-600" />
        {user.role === UserRole.USER
          ? "Homeowner Contact Details"
          : "Vendor Contact Details"}
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          {user.UserProfile && (
            <div>
              <p className="text-lg font-medium">{user.UserProfile.name}</p>
              <p className="text-sm text-gray-600">
                {user.role === UserRole.USER
                  ? "Project Owner"
                  : "Awarded Vendor"}
              </p>
            </div>
          )}
        </div>

        <div className="grid gap-4">
          {user.phone && (
            <div className="flex flex-col justify-between gap-4 rounded-lg border bg-white p-3">
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 text-green-600" />
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
                onClick={() => handlePhoneCall(user.phone as string)}
                type="button"
                size="sm"
                className="w-fit bg-green-600 hover:bg-green-700"
              >
                Call Now
              </Button>
            </div>
          )}

          <div className="flex flex-col justify-between gap-4 rounded-lg border bg-white p-3">
            <div className="flex items-center gap-3">
              <MailIcon className="h-5 w-5 text-blue-600" />
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
              onClick={() => handleEmail(user.email)}
              type="button"
              variant="outline"
              size="sm"
              className="w-fit bg-sky-700 text-white hover:bg-sky-800 hover:text-white"
            >
              Send Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
