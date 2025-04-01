import Link from "next/link";
import { CalendarIcon, PlusCircle, Search } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageContainer } from "../_components/page-container";

import Blog1 from "@/app/assets/blog-1.jpg";
import Blog2 from "@/app/assets/blog-2.jpg";
import Blog3 from "@/app/assets/blog-3.jpg";

// Bidding Management System blog data
const blogs = [
  {
    id: "1",
    slug: "how-to-win-more-bids-construction",
    title: "How to Win More Bids in the Construction Industry",
    excerpt:
      "Discover actionable strategies to improve your bidding success rate and stand out in a competitive market.",
    content:
      "Winning bids isn’t just about offering the lowest price. It’s about demonstrating value, trust, and reliability. Learn how to create compelling proposals and optimize your pricing structure.",
    publishedAt: "2025-03-15",
    readTime: "7 min read",
    category: "Bidding Strategies",
    image: Blog1.src,
    author: {
      name: "Rachel Thomas",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Construction Bidding Consultant",
    },
    featured: true,
  },
  {
    id: "2",
    slug: "streamlining-service-requests",
    title: "Streamlining Service Requests for Faster Job Turnaround",
    excerpt:
      "Learn how an organized bidding and scheduling process can help contractors deliver faster and more efficiently.",
    publishedAt: "2025-03-10",
    readTime: "6 min read",
    category: "Project Management",
    image: Blog2.src,
    author: {
      name: "Dev Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Operations Lead",
    },
    featured: false,
  },
  {
    id: "3",
    slug: "importance-of-accurate-scopes",
    title: "The Importance of Accurate Scopes in Construction Bids",
    excerpt:
      "Avoid cost overruns and disputes by clearly defining the scope of work in your bids.",
    publishedAt: "2025-03-05",
    readTime: "8 min read",
    category: "Bid Documentation",
    image: Blog3.src,
    author: {
      name: "Liam Harris",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Estimating Engineer",
    },
    featured: false,
  },
  {
    id: "4",
    slug: "tech-that-transforms-bidding",
    title: "Top Technologies Transforming the Bidding Process",
    excerpt:
      "Explore digital tools—from takeoff software to automated cost estimators—that streamline your bidding workflow.",
    publishedAt: "2025-02-28",
    readTime: "6 min read",
    category: "Technology",
    image: Blog3.src,
    author: {
      name: "Aria Sanchez",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Tech Advisor",
    },
    featured: false,
  },
  {
    id: "5",
    slug: "why-bid-transparency-matters",
    title: "Why Bid Transparency Builds Client Trust",
    excerpt:
      "Being open about pricing, timelines, and subcontractor details can win you more loyal clients.",
    publishedAt: "2025-02-20",
    readTime: "7 min read",
    category: "Client Relations",
    image: Blog3.src,
    author: {
      name: "Olivia Wu",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Client Success Manager",
    },
    featured: false,
  },
  {
    id: "6",
    slug: "common-bid-mistakes-to-avoid",
    title:
      "6 Common Mistakes Contractors Make When Bidding (And How to Avoid Them)",
    excerpt:
      "Prevent budget blowouts and missed deadlines by avoiding these common bidding pitfalls.",
    publishedAt: "2025-02-15",
    readTime: "5 min read",
    category: "Best Practices",
    image: Blog3.src,
    author: {
      name: "Marcus Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Field Supervisor",
    },
    featured: false,
  },
];

const categories = [
  "All",
  "Bidding Strategies",
  "Project Management",
  "Bid Documentation",
  "Technology",
  "Client Relations",
  "Best Practices",
];

export default function BlogPage() {
  return (
    <PageContainer name="Blog">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
            <p className="mt-1 text-muted-foreground">
              Explore the latest articles and tutorials
            </p>
          </div>
          <Link href="/blog/create">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Blog
            </Button>
          </Link>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="space-y-6 lg:col-span-1">
            <div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search blogs..."
                  className="pl-8"
                />
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-medium">Categories</h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === "All" ? "default" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-medium">Date</h3>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  This Week
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  This Month
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  This Year
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <Tabs defaultValue="all" className="mb-8">
              <TabsList>
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {blogs.map((blog) => (
                    <Link href={`/blog/${blog.slug}`} key={blog.id}>
                      <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                        <div className="relative aspect-video">
                          <img
                            src={blog.image || "/placeholder.svg"}
                            alt={blog.title}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute right-2 top-2">
                            <Badge variant="secondary">{blog.category}</Badge>
                          </div>
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="line-clamp-2 text-xl">
                            {blog.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="line-clamp-2 text-muted-foreground">
                            {blog.excerpt}
                          </p>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={blog.author.avatar}
                                alt={blog.author.name}
                              />
                              <AvatarFallback>
                                {blog.author.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{blog.author.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            <span>
                              {new Date(blog.publishedAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </span>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="featured" className="mt-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {blogs
                    .filter((blog) => blog.featured)
                    .map((blog) => (
                      <Link href={`/blog/${blog.slug}`} key={blog.id}>
                        <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                          <div className="relative aspect-video">
                            <img
                              src={blog.image || "/placeholder.svg"}
                              alt={blog.title}
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute right-2 top-2">
                              <Badge variant="secondary">{blog.category}</Badge>
                            </div>
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="line-clamp-2 text-xl">
                              {blog.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="line-clamp-2 text-muted-foreground">
                              {blog.excerpt}
                            </p>
                          </CardContent>
                          <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={blog.author.avatar}
                                  alt={blog.author.name}
                                />
                                <AvatarFallback>
                                  {blog.author.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{blog.author.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="h-4 w-4" />
                              <span>
                                {new Date(blog.publishedAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                  },
                                )}
                              </span>
                            </div>
                          </CardFooter>
                        </Card>
                      </Link>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="popular" className="mt-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {blogs.slice(2, 4).map((blog) => (
                    <Link href={`/blog/${blog.slug}`} key={blog.id}>
                      <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                        <div className="relative aspect-video">
                          <img
                            src={blog.image || "/placeholder.svg"}
                            alt={blog.title}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute right-2 top-2">
                            <Badge variant="secondary">{blog.category}</Badge>
                          </div>
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="line-clamp-2 text-xl">
                            {blog.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="line-clamp-2 text-muted-foreground">
                            {blog.excerpt}
                          </p>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={blog.author.avatar}
                                alt={blog.author.name}
                              />
                              <AvatarFallback>
                                {blog.author.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{blog.author.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            <span>
                              {new Date(blog.publishedAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </span>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="recent" className="mt-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {blogs.slice(0, 2).map((blog) => (
                    <Link href={`/blog/${blog.slug}`} key={blog.id}>
                      <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                        <div className="relative aspect-video">
                          <img
                            src={blog.image || "/placeholder.svg"}
                            alt={blog.title}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute right-2 top-2">
                            <Badge variant="secondary">{blog.category}</Badge>
                          </div>
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="line-clamp-2 text-xl">
                            {blog.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="line-clamp-2 text-muted-foreground">
                            {blog.excerpt}
                          </p>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={blog.author.avatar}
                                alt={blog.author.name}
                              />
                              <AvatarFallback>
                                {blog.author.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{blog.author.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            <span>
                              {new Date(blog.publishedAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </span>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" disabled>
                  <span className="sr-only">Previous page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </Button>
                <Button variant="outline" size="sm" className="font-medium">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="icon">
                  <span className="sr-only">Next page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
