"use client";

import { Check, CheckCircle2Icon, X } from "lucide-react";
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
import { useAllPlansQuery } from "@/queries/payments.queries";
import { LoaderComponent } from "@/components/loader-component";
import { faqs } from "./dats";

export default function MembershipPage() {
  const { data: plans, isError, error, isLoading } = useAllPlansQuery();

  if (isError) {
    throw error;
  }

  if (isLoading) {
    return (
      <LoaderComponent
        showText={true}
        text="Loading Plans..."
        className="flex h-screen w-screen items-center justify-center"
      />
    );
  }

  return (
    <div className="container mx-auto h-screen overflow-auto px-4 py-12">
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
            {plans?.map((plan, index) => (
              <Card
                key={plan.id}
                className={`flex flex-col ${plan.isPopular ? "relative border-primary shadow-lg" : "border-border"}`}
              >
                {plan.isPopular && (
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
                    <span className="text-4xl font-bold">${plan.amount}</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-3">
                    {index > 0 && (
                      <>
                        <li className="flex items-center">
                          <CheckCircle2Icon className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />{" "}
                          All
                          <span className="font-semibold">
                            &nbsp; {plans[index - 1].name} &nbsp;
                          </span>
                          Service Included
                        </li>
                      </>
                    )}

                    {plan.Service.map((service, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                        <span>{service.name}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${plan.isPopular ? "bg-brand-primary hover:bg-brand-primary/90" : plan.id === "tier3" ? "bg-brand-gold hover:bg-brand-gold/90" : "bg-primary/90"}`}
                  >
                    {plan.name}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="yearly" className="space-y-8">
          <div className="grid gap-8 md:grid-cols-3">
            {plans?.map((plan, index) => (
              <Card
                key={plan.id}
                className={`flex flex-col ${plan.isPopular ? "relative border-primary shadow-lg" : "border-border"}`}
              >
                {plan.isPopular && (
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
                      ${plan.amount * 10}
                    </span>
                    <span className="ml-1 text-muted-foreground">/year</span>
                  </div>
                  <ul className="space-y-3">
                    {index > 0 && (
                      <>
                        <li className="flex items-center">
                          <CheckCircle2Icon className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />{" "}
                          All
                          <span className="font-semibold">
                            &nbsp; {plans[index - 1].name} &nbsp;
                          </span>
                          Service Included
                        </li>
                      </>
                    )}
                    {plan.Service.map((service, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                        <span>{service.name}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${plan.isPopular ? "bg-brand-primary hover:bg-brand-primary/90" : plan.id === "tier3" ? "bg-brand-gold hover:bg-brand-gold/90" : "bg-primary/90"}`}
                  >
                    {plan.name}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

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
