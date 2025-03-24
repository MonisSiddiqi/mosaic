import {
  Check,
  CheckCheckIcon,
  CheckCircle2Icon,
  HelpCircle,
  X,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tier1Services = [
  "Handyman",
  "Grass Service",
  "Painting",
  "Drywall",
  "Windows",
  "Garage Doors",
  "Drop Ceiling",
  "Epoxy Flooring",
  "Tree Service",
  "Signs",
  "Waterproofing",
  "Gutter Cleaning",
];

const tier2Services = [
  "Plumbing",
  "Electrical",
  "HVAC",
  "Roofing",
  "Masonry",
  "Concrete",
  "Flooring",
  "Finish Carpentry",
  "Excavation",
  "Irrigation System",
  "Insulation",
  "Demolition",
  "Tile Install",
  "Fireplace Services",
  "Exterior Carpentry",
  "Staging Services",
];

const tier3Services = [
  "Remodeling",
  "General Contractors",
  "Engineering Services",
  "Property Management",
  "Custom Work",
  "Commercial Construction",
  "Septic & Well Services",
  "Fire Suppression",
  "Utility Services",
  "Underground Tap",
  "Full Demolition",
  "Large-Scale Foundation Work",
  "Asphalt & Driveway Work",
  "Materials Supplier",
  "Dumpster Service",
  "Signs & Large Installations",
];

const plans = [
  {
    id: "tier1",
    name: "Essential Trades",
    description: "Perfect for low earning jobs like handyman or painting",
    price: {
      monthly: 50,
      yearly: 500,
    },
    features: [
      ...tier1Services.map((service) => ({
        name: service,
        included: true,
      })),
      ...tier2Services.map((service) => ({
        name: service,
        included: false,
      })),
      ...tier3Services.map((service) => ({
        name: service,
        included: false,
      })),
    ],
    popular: false,
    cta: "Join Essential",
  },
  {
    id: "tier2",
    name: "Skilled Trades",
    description:
      "Includes all services in Essential Trades + specialized trades",
    price: {
      monthly: 80,
      yearly: 800,
    },
    features: [
      ...tier1Services.map((service) => ({
        name: service,
        included: true,
      })),
      ...tier2Services.map((service) => ({
        name: service,
        included: true,
      })),
      ...tier3Services.map((service) => ({
        name: service,
        included: false,
      })),
    ],
    popular: true,
    cta: "Join Skilled",
  },
  {
    id: "tier3",
    name: "High-Value Trades",
    description:
      "Includes all services in Skilled Trades + premium large-scale services",
    price: {
      monthly: 99,
      yearly: 999,
    },
    features: [
      ...tier1Services.map((service) => ({
        name: service,
        included: true,
      })),
      ...tier2Services.map((service) => ({
        name: service,
        included: true,
      })),
      ...tier3Services.map((service) => ({
        name: service,
        included: true,
      })),
    ],

    popular: false,
    cta: "Join Premium",
  },
];

export default function MembershipPage() {
  // Dummy FAQs
  const faqs = [
    {
      question: "How do I upgrade or downgrade my membership?",
      answer:
        "You can easily upgrade or downgrade your membership at any time from your account settings. Changes to a higher tier take effect immediately, while downgrades will apply at the end of your current billing cycle.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a 7-day free trial for all new members. You can experience all the features of the Pro plan during your trial period with no obligation to continue.",
    },
    {
      question: "Can I cancel my membership at any time?",
      answer:
        "You can cancel your membership at any time from your account settings. If you cancel, you'll still have access to your membership benefits until the end of your current billing period.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and Apple Pay. For annual memberships, we also offer invoicing options for businesses.",
    },
    {
      question: "Are there discounts for teams or organizations?",
      answer:
        "Yes, we offer special pricing for teams of 5 or more members. Please contact our sales team for a custom quote tailored to your organization's needs.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Choose Your Membership Plan
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          Join our community and unlock exclusive benefits tailored to your
          needs. Select the perfect plan for your journey.
        </p>
      </div>

      <Tabs defaultValue="monthly" className="mb-16 w-full">
        <div className="mb-8 flex justify-center">
          <TabsList>
            <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
            <TabsTrigger value="yearly">
              Yearly Billing
              <Badge
                variant="secondary"
                className="ml-2 bg-primary/20 text-primary"
              >
                Save 2 Months
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="monthly" className="space-y-8">
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`flex flex-col ${plan.popular ? "relative border-primary shadow-lg" : "border-border"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      ${plan.price.monthly}
                    </span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.id === "tier1" &&
                      tier1Services.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}

                    {plan.id === "tier2" && (
                      <>
                        <li className="flex items-center">
                          <CheckCircle2Icon className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />{" "}
                          All Essential Trades Service Included
                        </li>
                        {tier2Services.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </>
                    )}

                    {plan.id === "tier3" && (
                      <>
                        <li className="flex items-center">
                          <CheckCircle2Icon className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />{" "}
                          All Skilled Trades Service Included
                        </li>
                        {tier3Services.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </>
                    )}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${plan.popular ? "bg-brand-primary hover:bg-brand-primary/90" : plan.id === "tier3" ? "bg-brand-gold hover:bg-brand-gold/90" : "bg-primary/90"}`}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="yearly" className="space-y-8">
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`flex flex-col ${plan.popular ? "relative border-primary shadow-lg" : "border-border"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      ${plan.price.yearly}
                    </span>
                    <span className="ml-1 text-muted-foreground">/year</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.id === "tier1" &&
                      tier1Services.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}

                    {plan.id === "tier2" && (
                      <>
                        <li className="flex items-center">
                          <CheckCircle2Icon className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />{" "}
                          All Essential Trades Service Included
                        </li>
                        {tier2Services.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </>
                    )}

                    {plan.id === "tier3" && (
                      <>
                        <li className="flex items-center">
                          <CheckCircle2Icon className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />{" "}
                          All Skilled Trades Service Included
                        </li>
                        {tier3Services.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </>
                    )}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${plan.popular ? "bg-brand-primary hover:bg-brand-primary/90" : plan.id === "tier3" ? "bg-brand-gold hover:bg-brand-gold/90" : "bg-primary/90"}`}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Membership Tiers Based on Your Trade
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Choose the right plan for your trade category and unlock unmatched
            visibility and job leads.
          </p>
        </div>

        <div className="mb-20">
          <h2 className="mb-10 text-center text-3xl font-bold">
            Compare Membership Services
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="w-1/3 px-6 py-4 text-left">Service</th>
                  {plans.map((plan, index) => (
                    <th
                      key={plan.id}
                      className={`px-6 py-4 text-center ${index === 1 ? "bg-primary/5" : ""}`}
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...tier1Services, ...tier2Services, ...tier3Services].map(
                  (service) => (
                    <tr key={service} className="border-b">
                      <td className="px-6 py-4 font-medium">{service}</td>
                      {plans.map((plan, planIndex) => (
                        <td
                          key={plan.id}
                          className={`px-6 py-4 text-center ${planIndex === 1 ? "bg-primary/5" : ""}`}
                        >
                          {plan.features.find((f) => f.name === service)
                            ?.included ? (
                            <Check className="mx-auto h-5 w-5 text-primary" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-muted-foreground" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mx-auto mb-20 max-w-3xl">
        <h2 className="mb-10 text-center text-3xl font-bold">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>
          Have questions? Contact our support team at{" "}
          <Link href="mailto:support@example.com" className="text-primary">
            support@craftyfuture.com
          </Link>
        </p>
        <p className="mt-2">
          All plans come with a 30-day money-back guarantee. No questions asked.
        </p>
      </div>
    </div>
  );
}
