import { ProjectTag } from "@/apis/projects";
import { Service } from "@/apis/services";
import { Badge } from "@/components/ui/badge";

export const ProjectTags = ({
  tags,
  service,
}: {
  tags: ProjectTag[];
  service: Service;
}) => {
  return (
    <div className="flex w-fit flex-col gap-5 rounded-md border border-gray-200 bg-white p-4">
      <p className="text-lg font-semibold text-gray-700">{service?.name}</p>
      <div className="flex gap-2">
        {tags.map((tag) => (
          <Badge variant={"secondary"} key={tag.tagId}>
            {tag?.tag?.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};
