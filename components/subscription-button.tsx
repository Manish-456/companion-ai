"use client";

import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import axios from "axios";

export function SubscriptionButton({isPro} : {
    isPro : boolean
}) {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const onClick = async() => {
    try {
        setLoading(true);
        const response = await axios.get('/api/stripe');
        window.location.href = response.data.url;
    } catch (error) {
         toast({
            description : "Something went wrong",
            variant : "destructive"
         });
    }finally {
        setLoading(false);
    }
    }

  return (
    <Button size={"sm"} disabled={loading} 
     onClick={onClick}
    variant={isPro ? "default" :"premium"}>
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Sparkles className="h-4 w-4 ml-2 fill-white" />}
    </Button>
  )
}