"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check,X } from "lucide-react";
import { SubmitButton } from "../dashboard/SubmitButtons";
import { CreateFreeSubscription, CreateSubscription } from "@/actions";
import { useState } from "react";
import { toast } from "sonner";

interface iAppProps {
  id: number;
  cardTitle: string;
  cardDescription: string;
  priceTitle: string;
  benefits: string[];
  nots?: string[];
}

export const PricingPlans: iAppProps[] = [
  {
    id: 0,
    cardTitle: "Startup",
    cardDescription: "The best pricing plan for people starting out.",
    benefits: [
      "Only 1 Channel",
      "Limited Visitors",
      "Normal Blog Editor",
    ],
    nots: [
      "Add Channel Editor",
      "SEO AI Helper",
      "24X7 Support",
      "Earning Support",
    ],
    priceTitle: "Free",
  },
  {
    id: 1,
    cardTitle: "Professional",
    cardDescription: "The best pricing plan for professionals team.",
    priceTitle: "2000",
    benefits: [
      "Unlimited Channels",
      "Unimlited Visitors",
      "Notion-like Rich Blog Editor",
      "Add Channel Editor",
      "SEO AI Helper",
      "24X7 Support",
      "Earning Support"
    ],
  },
];

export function PricingTable({loggedIn,role,status}:{loggedIn:boolean,role:string,status:boolean}) {
  const [loading, setLoading] = useState(false);
  const handleFree = async () => {
    if(!loggedIn){
      toast.error("Login to continue");
      return;
    }
    setLoading(true);
    await CreateFreeSubscription();
  }
  return (
    <>
      <div className="max-w-5xl mx-auto text-center" id="pricing">
        <p className="font-semibold text-primary">Pricing</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-5xl">
          Pricing Plans for everyone and every budget!
        </h2>
      </div>

      <p className="mx-auto mt-4 max-w-2xl text-center leading-tight text-muted-foreground">
        Choose the plan that is right for you. You can also switch plans later.
      </p>

      <div className="grid grid-cols-1 gap-8 mt-16 lg:grid-cols-2">
        {PricingPlans.map((item) => (
          <Card key={item.id} className={item.id === 1 ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle>
                {item.id === 1 ? (
                  <div className="flex items-center justify-between">
                    <h3 className="text-primary">Professionals</h3>

                    <p className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold leading-5 text-primary">
                      Most popular
                    </p>
                  </div>
                ) : (
                  <>{item.cardTitle}</>
                )}
              </CardTitle>
              <CardDescription>{item.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mt-6 flex items-baseline">
              {item.id === 1 && <span className="mr-1 text-4xl font-semibold">₹</span>}  
              <span className="text-5xl font-extrabold tracking-tight">{item.priceTitle}</span>
              {item.id === 1 && <span className="ml-1 text-xl font-semibold">/month</span>}
              </p>

              <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                {item.benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-x-3">
                    <Check className="text-primary size-5" />

                    {benefit}
                  </li>
                ))}
                {item.nots?.map((nots, index) => (
                  <li key={index} className="flex gap-x-3">
                    <X className="text-primary size-5" />
                    {nots}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {item.id === 1 ? (
                <form className="w-full" action={CreateSubscription}>
                  { loggedIn && !status ?
                  <SubmitButton text="Buy Plan" className="mt-5 w-full" />
                  : <Button className="mt-5 w-full" disabled={status} onClick={handleFree}>{status?"Already Taken":"Buy Plan"}</Button>
                  }
                </form>
              ) : (
                <Button variant="outline" disabled={role!=="READER" || loading?true:false} className="mt-5 w-full" onClick={handleFree}>
                    {role==="READER"?loading?"Loading...":"Try For Free":"Already Taken"}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
