"use client";

import { Search } from "@/app/-components/search";
import Blog1 from "@/app/assets/blog-1.jpg";
import Blog2 from "@/app/assets/blog-2.jpg";
import Blog3 from "@/app/assets/blog-3.jpg";
import { useState } from "react";
import { BlogCard } from "./blog-card";

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

export const BlogsContainer = () => {
  const [query, setQuery] = useState("");

  return (
    <div>
      <Search query={query} setQuery={setQuery} placeholder="Search Blogs..." />

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>
    </div>
  );
};
