import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

import SarahJohnsonImage from "@/app/assets/sara-johnson.png";
import DavidBrownImage from "@/app/assets/devid-brown.png";
import JamesCarterImage from "@/app/assets/games-carter.png";

interface Testimonial {
  id: number;
  rating: number;
  title: string;
  content: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    rating: 5,
    title: "A Game-Changer in Simplifying Processes",
    content:
      "Using Crafty Future, I streamlined my workflows and achieved outstanding results. The platform's features and support exceeded my expectations, making my work more efficient.",
    author: {
      name: "Sarah Johnson",
      role: "Homeowner",
      image: SarahJohnsonImage.src,
    },
  },
  {
    id: 2,
    rating: 5,
    title: "Exceptional Support and Innovative Solutions",
    content:
      "The team truly understands user needs. They not only provided great solutions but also offered outstanding support throughout. I highly recommend Crafty Future.",
    author: {
      name: "David Brown",
      role: "Homeowner",
      image: DavidBrownImage.src,
    },
  },
  {
    id: 3,
    rating: 5,
    title: "A Must-Have for Success for your households.",
    content:
      "Thanks to Crafty Future and their professionals for providing an amazing experience, I saved hours of effort every week. It's a tool that delivers on its promises and more!",
    author: {
      name: "James Carter",
      role: "Homeowner",
      image: JamesCarterImage.src,
    },
  },
];

export function TestimonialSection() {
  return (
    <section className="bg-gray-800 py-24 pb-36">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="mb-4 block text-lg text-white">Testimonial</span>
          <h2 className="mb-4 text-5xl font-bold text-white">
            What Our Users Say About Us
          </h2>
          <p className="text-xl text-gray-300">
            Real stories from real users who have experienced the impact of our
            services.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white p-8">
              <CardContent className="space-y-6 p-0">
                {/* Rating */}
                <div className="flex items-start justify-between">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-6 w-6 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-gray-300" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {testimonial.title}
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    {testimonial.content}
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <Image
                    src={testimonial.author.image}
                    alt={testimonial.author.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.author.name}
                    </h4>
                    <p className="text-gray-600">{testimonial.author.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
