
import { Card } from "@/components/ui/card";
import * as React from "react";

interface HighlightCardProps {
  dish: {
    name: string;
    price: number;
    image: string;
  };
  label: string;
  icon: React.ReactNode;
}

const HighlightCard = ({ dish, label, icon }: HighlightCardProps) => (
  <Card className="overflow-hidden rounded-2xl border-secondary shadow-sm transition-shadow hover:shadow-lg h-full">
    <div className="p-3 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{icon}</span>
        <h4 className="font-semibold text-sm text-muted-foreground">{label}</h4>
      </div>
      <img src={dish.image} alt={dish.name} className="h-24 w-full object-cover rounded-lg mb-2" />
      <div className="mt-auto">
        <h3 className="font-bold text-md font-serif truncate">{dish.name}</h3>
        <p className="text-sm font-bold text-primary">₹{dish.price}</p>
      </div>
    </div>
  </Card>
);

export default HighlightCard;
