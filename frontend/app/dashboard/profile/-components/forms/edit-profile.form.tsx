"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { RefreshCcwIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, FC, SetStateAction, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useEditProfileMutation } from "@/queries/users.queries";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const formSchema = z.object({
  file: z
    .instanceof(File)

    .optional(),
  name: z.string().min(2, "Name is required."),
});

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const EditProfileForm: FC<Props> = ({ setOpen }) => {
  const { user, setUser } = useAuth();

  const inputRef = useRef<HTMLInputElement>(null);

  const [filePreview, setFilePreview] = useState<string | null>(
    user?.UserProfile?.image as string,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
      name: user?.UserProfile?.name,
    },
  });

  const mutation = useEditProfileMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const updatedUser = await mutation.mutateAsync(values);

      setUser(updatedUser);

      toast({
        variant: "success",
        title: "Profile edited successfully",
      });

      setOpen(false);
    } catch (e) {
      toast({
        variant: "destructive",
        title: e instanceof Error ? e.message : "Failed to edit profile",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-4 grid w-full gap-4">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload profile picture</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = (event) => {
                          setFilePreview(event.target?.result as string);
                        };
                      }
                      field.onChange(file);
                    }}
                    ref={inputRef}
                  />
                </FormControl>

                <FormMessage />
                {filePreview && (
                  <div
                    className="mt-3"
                    onClick={() => inputRef.current && inputRef.current.click()}
                  >
                    <div className="mt-2 flex justify-center rounded-lg border bg-gray-50 p-2">
                      <Avatar className="h-24 w-24">
                        <AvatarImage
                          src={filePreview}
                          alt={"Profile Picture"}
                          className="object-cover"
                        />
                      </Avatar>
                    </div>
                  </div>
                )}
              </FormItem>
            )}
          />

          {/* Title Input */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormDescription>Provide your name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="flex w-full justify-end">
          <Button
            disabled={mutation.isPending}
            type="submit"
            className="mt-4 px-5 py-2"
          >
            {mutation.isPending && (
              <RefreshCcwIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
