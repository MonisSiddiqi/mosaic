import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

type Blog = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  publishedAt: string;
  readTime?: string;
  category?: string;
  image: string;
};

export const BlogCard: FC<Blog> = (blog) => {
  return (
    <Link href={`/blog/${blog.title}`}>
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
        <div className="relative aspect-video">
          <img
            src={blog.image}
            alt={blog.title}
            className="h-full w-full object-cover"
          />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="line-clamp-2 text-xl">{blog.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 text-muted-foreground">{blog.excerpt}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex gap-2">
            <CalendarIcon className="h-4 w-4" />
            <span>
              {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
