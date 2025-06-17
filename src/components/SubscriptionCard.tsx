
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Pause, Play, X } from "lucide-react";

interface Subscription {
  id: string;
  dishName: string;
  cookName: string;
  price: number;
  frequency: 'weekly' | 'monthly';
  status: 'active' | 'paused';
  nextDelivery: string;
  image: string;
}

interface SubscriptionCardProps {
  subscription: Subscription;
}

const SubscriptionCard = ({ subscription }: SubscriptionCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <img 
            src={subscription.image} 
            alt={subscription.dishName} 
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{subscription.dishName}</h3>
            <p className="text-xs text-muted-foreground">by {subscription.cookName}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Badge 
                variant={subscription.status === 'active' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {subscription.frequency} • {subscription.status}
              </Badge>
            </div>
            <div className="flex items-center space-x-1 mt-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>Next: {subscription.nextDelivery}</span>
            </div>
            <p className="text-sm font-bold text-primary mt-1">₹{subscription.price}</p>
          </div>
          <div className="flex flex-col space-y-1">
            <Button 
              size="sm" 
              variant="outline" 
              className="h-6 px-2"
            >
              {subscription.status === 'active' ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-6 px-2 text-red-600"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
