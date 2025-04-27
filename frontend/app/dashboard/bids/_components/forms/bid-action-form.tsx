import { BidStatus } from "@/apis/bids";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckBigIcon, SendIcon, XIcon } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ActionWarning } from "../action-warning";

type Props = {
  status: BidStatus;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const formSchema = z
  .object({
    status: z.enum([BidStatus.ACCEPTED, BidStatus.REJECTED, BidStatus.PENDING]),
    proposalMessage: z.string().optional(),
    attachment: z.instanceof(File).optional(),
  })
  .refine(
    (data) => {
      if (data.status === BidStatus.ACCEPTED) {
        if (!data.proposalMessage) {
          return false;
        }
      }

      return true;
    },
    { path: ["proposalMessage"], message: "Proposal message is required" },
  )
  .refine(
    (data) => {
      if (data.status === BidStatus.ACCEPTED) {
        if (!data.attachment) {
          return false;
        }
      }

      return true;
    },
    { path: ["attachment"], message: "Attachment file is required" },
  )
  .refine((data) => (data.status === BidStatus.PENDING ? false : true), {
    message: "Select your choice",
    path: ["status"],
  });

export const BidActionForm: FC<Props> = ({ status }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      proposalMessage: "",
      status,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-7"
      >
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-4">
                  <Button
                    variant={"secondary"}
                    type="button"
                    className={`gap-2 ${field.value === BidStatus.ACCEPTED ? "bg-green-600 text-white hover:bg-green-600 hover:text-white" : "border border-green-500 bg-white text-green-600 hover:bg-green-600 hover:text-white"}`}
                    onClick={() => field.onChange(BidStatus.ACCEPTED)}
                  >
                    <CircleCheckBigIcon /> Accept
                  </Button>

                  <Button
                    variant={"secondary"}
                    type="button"
                    className={`gap-2 ${field.value === BidStatus.REJECTED ? "bg-red-500 text-white hover:bg-red-500 hover:text-white" : "border border-red-500 bg-white text-red-600 hover:bg-red-500 hover:text-white"}`}
                    onClick={() => field.onChange(BidStatus.REJECTED)}
                  >
                    <XIcon /> Rejected
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("status") === BidStatus.ACCEPTED && (
          <>
            <FormField
              control={form.control}
              name="proposalMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proposal Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter your proposal message"
                      className="h-24"
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Tell your proposal message to the home owners
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="attachment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attach your propsal documents</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      placeholder="Attach your file"
                      onChange={(e) =>
                        form.setValue("attachment", e.target.files?.[0])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Attach the related document (.pdf) you want to show to home
                    owner
                  </FormDescription>
                </FormItem>
              )}
            />
          </>
        )}

        {form.watch("status") !== "PENDING" && (
          <ActionWarning status={form.watch("status")} />
        )}

        <div className="mt-2 flex justify-end">
          <Button className="gap-2">
            <SendIcon className="size-5" /> Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
