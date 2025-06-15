
import { Clock, Truck, CheckCircle, ChefHat } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface OrderTrackingProps {
  order: {
    id: string;
    status: "preparing" | "cooking" | "on-the-way" | "delivered";
    estimatedTime?: string;
    actualTime?: string;
  };
}

const OrderTracking = ({ order }: OrderTrackingProps) => {
  const getProgressValue = (status: string) => {
    switch (status) {
      case "preparing": return 25;
      case "cooking": return 50;
      case "on-the-way": return 75;
      case "delivered": return 100;
      default: return 0;
    }
  };

  const trackingSteps = [
    { status: "preparing", icon: Clock, label: "Order Received", time: "2 mins ago" },
    { status: "cooking", icon: ChefHat, label: "Cooking Started", time: order.status === "preparing" ? "Pending" : "15 mins ago" },
    { status: "on-the-way", icon: Truck, label: "Out for Delivery", time: ["preparing", "cooking"].includes(order.status) ? "Pending" : "5 mins ago" },
    { status: "delivered", icon: CheckCircle, label: "Delivered", time: order.status === "delivered" ? order.actualTime || "Just now" : "Pending" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Order Tracking</span>
          <Badge variant="outline">#{order.id}</Badge>
        </CardTitle>
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
            const isCompleted = getProgressValue(order.status) > index * 25;
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
              Estimated delivery: {order.estimatedTime}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderTracking;
