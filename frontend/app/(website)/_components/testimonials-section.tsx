import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

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
      "Using Mosaic, I streamlined my workflows and achieved outstanding results. The platform's features and support exceeded my expectations, making my work more efficient.",
    author: {
      name: "Sarah Johnson",
      role: "Homeowner",
      image: "/testimonials/sarah.jpg",
    },
  },
  {
    id: 2,
    rating: 5,
    title: "Exceptional Support and Innovative Solutions",
    content:
      "The team truly understands user needs. They not only provided great solutions but also offered outstanding support throughout. I highly recommend mosaic.",
    author: {
      name: "David Brown",
      role: "Homeowner",
      image: "/testimonials/david.jpg",
    },
  },
  {
    id: 3,
    rating: 5,
    title: "A Must-Have for Success for your households.",
    content:
      "Thanks to mosaic and their professionals for providing an amazing experience, I saved hours of effort every week. It's a tool that delivers on its promises and more!",
    author: {
      name: "James Carter",
      role: "Homeowner",
      image: "/testimonials/james.jpg",
    },
  },
];

export function TestimonialSection() {
  return (
    <section className="py-20 bg-[#374151]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-white text-lg mb-4 block">Testimonial</span>
          <h2 className="text-white text-5xl font-bold mb-4">
            What Our Users Say About Us
          </h2>
          <p className="text-gray-300 text-xl">
            Real stories from real users who have experienced the impact of our
            services.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white p-8">
              <CardContent className="p-0 space-y-6">
                {/* Rating */}
                <div className="flex justify-between items-start">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-gray-300" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {testimonial.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
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
