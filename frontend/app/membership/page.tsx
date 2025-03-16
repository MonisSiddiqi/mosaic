import { Check, HelpCircle, X } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MembershipPage() {
  const plans = [
    {
      id: "basic",
      name: "Basic",
      description: "Essential features for individuals",
      price: {
        monthly: 4.99,
        yearly: 50.99,
      },
      features: [
        { name: "Can add up to 5 services", included: true },
        { name: "Bids will be given from your home district", included: true },
        { name: "Profile listing in the vendor directory", included: true },
        { name: "Email notifications for relevant projects", included: false },
        { name: "Customer reviews and ratings on profile", included: false },
        { name: "Direct messaging with clients", included: false },
      ],
      popular: false,
      cta: "Get Started",
    },
    {
      id: "pro",
      name: "Pro",
      description: "Perfect for enthusiasts and professionals",
      price: {
        monthly: 10.99,
        yearly: 110.99,
      },
      features: [
        { name: "Can add up to 12 services", included: true },
        { name: "Bids will be given from your state", included: true },
        {
          name: "Priority profile listing in the vendor directory",
          included: true,
        },
        {
          name: "Email & SMS notifications for relevant projects",
          included: true,
        },
        { name: "Customer reviews and ratings on profile", included: true },
        { name: "Direct messaging with clients", included: false },
      ],
      popular: true,
      cta: "Go Pro",
    },
    {
      id: "premium",
      name: "Premium",
      description: "Ultimate experience with all features",
      price: {
        monthly: 19.99,
        yearly: 203.99,
      },
      features: [
        { name: "Unlimited services can be added", included: true },
        {
          name: "Bids will be given from all over the country",
          included: true,
        },
        {
          name: "Featured profile listing with higher visibility",
          included: true,
        },
        {
          name: "Instant email & SMS notifications for relevant projects",
          included: true,
        },
        { name: "In-depth analytics and bid success insights", included: true },
        { name: "Direct messaging with clients", included: true },
      ],
      popular: false,
      cta: "Go Premium",
    },
  ];

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
                Save 15%
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
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        {feature.included ? (
                          <Check className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                        ) : (
                          <X className="mr-2 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                        )}
                        <span
                          className={
                            feature.included ? "" : "text-muted-foreground"
                          }
                        >
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${plan.popular ? "bg-brand-primary hover:bg-brand-primary/90" : plan.id === "premium" ? "bg-brand-gold hover:bg-brand-gold/90" : "bg-primary/90"}`}
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
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        {feature.included ? (
                          <Check className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                        ) : (
                          <X className="mr-2 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                        )}
                        <span
                          className={
                            feature.included ? "" : "text-muted-foreground"
                          }
                        >
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${plan.popular ? "bg-brand-primary hover:bg-brand-primary/90" : plan.id === "premium" ? "bg-brand-gold hover:bg-brand-gold/90" : "bg-primary/90"}`}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mb-20">
        <h2 className="mb-10 text-center text-3xl font-bold">
          Compare Membership Features
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="w-1/3 px-6 py-4 text-left">Features</th>
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
              {plans[0].features.map((feature, featureIndex) => (
                <tr key={feature.name} className="border-b">
                  <td className="px-6 py-4 font-medium">
                    <div className="flex items-center">
                      {feature.name}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="ml-2 h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-[200px]">
                              {feature.name} feature details
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </td>
                  {plans.map((plan, planIndex) => (
                    <td
                      key={plan.id}
                      className={`px-6 py-4 text-center ${planIndex === 1 ? "bg-primary/5" : ""}`}
                    >
                      {plan.features[featureIndex].included ? (
                        <Check className="mx-auto h-5 w-5 text-primary" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-muted-foreground" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
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
