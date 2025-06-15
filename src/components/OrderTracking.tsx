
import { Clock, Truck, CheckCircle, ChefHat, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface OrderTrackingProps {
  order: {
    id: string;
    status: "scheduled" | "preparing" | "cooking" | "on-the-way" | "delivered";
    estimatedTime?: string;
    actualTime?: string;
    scheduledFor?: string;
    mealType?: string;
  };
}

const OrderTracking = ({ order }: OrderTrackingProps) => {
  const getProgressValue = (status: string) => {
    switch (status) {
      case "scheduled": return 10;
      case "preparing": return 30;
      case "cooking": return 60;
      case "on-the-way": return 85;
      case "delivered": return 100;
      default: return 0;
    }
  };

  const trackingSteps = [
    { status: "scheduled", icon: Calendar, label: "Order Scheduled", time: order.scheduledFor || "Tomorrow 8:00 AM" },
    { status: "preparing", icon: Clock, label: "Preparation Started", time: order.status === "scheduled" ? "Pending" : "30 mins ago" },
    { status: "cooking", icon: ChefHat, label: "Cooking in Progress", time: ["scheduled", "preparing"].includes(order.status) ? "Pending" : "15 mins ago" },
    { status: "on-the-way", icon: Truck, label: "Out for Delivery", time: ["scheduled", "preparing", "cooking"].includes(order.status) ? "Pending" : "5 mins ago" },
    { status: "delivered", icon: CheckCircle, label: "Delivered", time: order.status === "delivered" ? order.actualTime || "Just now" : "Pending" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Order Tracking</span>
          <Badge variant="outline">#{order.id}</Badge>
        </CardTitle>
        {order.mealType && (
          <p className="text-sm text-muted-foreground">
            {order.mealType} • {order.scheduledFor}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{getProgressValue(order.status)}%</span>
          </div>
          <Progress value={getProgressValue(order.status)} className="w-full" />
        </div>
        
        <div className="space-y-3">
          {trackingSteps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = getProgressValue(order.status) > index * 20;
            const isCurrent = step.status === order.status;
            
            return (
              <div key={step.status} className={`flex items-center space-x-3 ${isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`p-2 rounded-full ${isCompleted ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${isCurrent ? 'text-primary' : ''}`}>{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.time}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        {order.estimatedTime && order.status !== "delivered" && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-700">
              <Clock className="h-4 w-4 inline mr-1" />
              {order.status === "scheduled" ? 
                `Scheduled for: ${order.scheduledFor}` : 
                `Estimated delivery: ${order.estimatedTime}`
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderTracking;
