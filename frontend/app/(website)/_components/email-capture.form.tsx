"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle } from "lucide-react";

interface EmailCaptureFormProps {
  simplified: boolean;
}

export function EmailCaptureForm({ simplified }: EmailCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({ email, name, userType, consent });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-6">
        <CheckCircle className="mb-4 h-12 w-12 text-green-500" />
        <h3 className="mb-2 text-xl font-semibold">{"You're"} in!</h3>
        <p className="text-center text-gray-600">
          Thanks for signing up. {"We'll"} notify you as soon as we launch.
        </p>
      </div>
    );
  }

  if (simplified) {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-grow"
        />
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
          Notify Me
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name (optional)</Label>
        <Input
          id="name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email (required)</Label>
        <Input
          id="email"
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="userType">{"I'm"} a...</Label>
        <Select value={userType} onValueChange={setUserType}>
          <SelectTrigger id="userType">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="homeowner">Homeowner</SelectItem>
            <SelectItem value="professional">Trade Professional</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-start space-x-2 pt-2">
        <Checkbox
          id="consent"
          checked={consent}
          onCheckedChange={(checked) => setConsent(checked as boolean)}
          required
        />
        <Label htmlFor="consent" className="text-sm leading-tight">
          I agree to receive updates from Crafty Future.
        </Label>
      </div>

      <Button
        type="submit"
        className="mt-6 w-full bg-orange-500 hover:bg-orange-600"
      >
        Join the Waitlist
      </Button>
    </form>
  );
}
