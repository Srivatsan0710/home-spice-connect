
import { Clock, CheckCircle, Truck, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockOrders = [
  {
    id: "ORD001",
    date: "Today, 2:30 PM",
    status: "preparing",
    cook: "Aunty Manjeet",
    dishes: [
      { name: "Aloo Paratha Special", quantity: 2, price: 150 },
      { name: "Sarson da Saag", quantity: 1, price: 250 }
    ],
    total: 550,
    estimatedTime: "45 mins"
  },
  {
    id: "ORD002",
    date: "Yesterday, 7:15 PM",
    status: "delivered",
    cook: "Mala Di",
    dishes: [
      { name: "Shorshe Ilish", quantity: 1, price: 350 },
      { name: "Kosha Mangsho", quantity: 1, price: 320 }
    ],
    total: 670,
    rating: 5
  },
  {
    id: "ORD003",
    date: "Dec 13, 1:00 PM",
    status: "delivered",
    cook: "Meena Amma",
    dishes: [
      { name: "Masala Dosa", quantity: 3, price: 180 },
      { name: "Hyderabadi Biryani", quantity: 1, price: 300 }
    ],
    total: 840,
    rating: 4
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "preparing":
      return <Clock className="h-4 w-4 text-orange-500" />;
    case "on-the-way":
      return <Truck className="h-4 w-4 text-blue-500" />;
    case "delivered":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "preparing":
      return "bg-orange-100 text-orange-700";
    case "on-the-way":
      return "bg-blue-100 text-blue-700";
    case "delivered":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const Orders = () => {
  return (
    <div className="pb-16">
      <header className="sticky top-0 z-10 bg-background/80 p-4 backdrop-blur-sm">
        <h1 className="text-2xl font-bold font-serif text-primary">My Orders</h1>
        <p className="text-sm text-muted-foreground">Track your delicious meals</p>
      </header>

      <main className="p-4 space-y-4">
        {mockOrders.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold">Order #{order.id}</CardTitle>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <Badge className={getStatusColor(order.status)}>
                    {order.status === "preparing" ? "Preparing" : 
                     order.status === "on-the-way" ? "On the way" : "Delivered"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">by {order.cook}</p>
                {order.estimatedTime && (
                  <p className="text-sm text-muted-foreground">
                    Est. {order.estimatedTime}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                {order.dishes.map((dish, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span>{dish.quantity}x {dish.name}</span>
                    <span>₹{dish.price}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t pt-2">
                <span className="font-bold">Total: ₹{order.total}</span>
                {order.status === "delivered" && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{order.rating}</span>
                  </div>
                )}
              </div>

              {order.status === "preparing" && (
                <Button variant="outline" size="sm" className="w-full">
                  Track Order
                </Button>
              )}

              {order.status === "delivered" && !order.rating && (
                <Button variant="outline" size="sm" className="w-full">
                  Rate & Review
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
};

export default Orders;
