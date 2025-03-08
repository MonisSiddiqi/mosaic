import { TagsListItem } from "@/apis/tags";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { useAddVendorTagMutation } from "@/queries/tags.queries";
import { Loader2Icon } from "lucide-react";
import { FC, useState } from "react";

type Props = {
  tag: TagsListItem;
};
export const VendorTagCard: FC<Props> = ({ tag }) => {
  const [isAdded, setIsAdded] = useState(tag.VendorTag.length > 0);

  const addVendorTagMutation = useAddVendorTagMutation();

  const handleAddTag = async (tagId: string) => {
    try {
      await addVendorTagMutation.mutateAsync(tagId);

      setIsAdded((prev) => !prev);
      toast({
        variant: "success",
        title: "Tag has been removed from your account.",
      });
    } catch (err) {
      const title = isAdded ? "Failed to remove tag." : "Failed to add tag.";
      toast({
        variant: "destructive",
        title: err instanceof Error ? err.message : title,
      });
    }
  };

  return (
    <div
      key={tag.id}
      className={`flex cursor-pointer rounded-md border p-3 transition-colors ${isAdded ? "border-primary/30 bg-primary/5" : "hover:bg-muted/50"} `}
    >
      {addVendorTagMutation.isPending ? (
        <Loader2Icon className="mr-3 size-4 animate-spin" />
      ) : (
        <Checkbox
          onClick={() => handleAddTag(tag.id)}
          checked={isAdded}
          disabled={addVendorTagMutation.isPending}
          className="mr-3"
          id={`tag-${tag.id}`}
        />
      )}

      <label
        htmlFor={`tag-${tag.id}`}
        className="flex-1 cursor-pointer text-sm"
      >
        {tag.name}
      </label>
    </div>
  );
};
