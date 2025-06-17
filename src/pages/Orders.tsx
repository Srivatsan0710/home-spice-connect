
import { Clock, CheckCircle, Truck, Star, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockOrders = [
  {
    id: "ORD001",
    date: "Today, 2:30 PM",
    status: "preparing",
    cook: "Chef Gurpreet Singh",
    dishes: [
      { name: "Authentic Aloo Paratha", quantity: 2, price: 170, image: "https://images.unsplash.com/photo-1626132647346-f4d2f2d0a5f0?q=80&w=200" },
      { name: "Sarson da Saag", quantity: 1, price: 160, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=200" }
    ],
    total: 330,
    estimatedTime: "45 mins",
    packageType: "Eco-friendly Container"
  },
  {
    id: "ORD002",
    date: "Yesterday, 7:15 PM",
    status: "delivered",
    cook: "Chef Shilpa Banerjee",
    dishes: [
      { name: "Bengali Fish Curry", quantity: 1, price: 200, image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=200" },
      { name: "Steamed Rice", quantity: 1, price: 80, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=200" }
    ],
    total: 280,
    rating: 5,
    packageType: "Sealed Fresh Container"
  },
  {
    id: "ORD003",
    date: "Dec 13, 1:00 PM",
    status: "delivered",
    cook: "Chef Lakshmi Narayanan",
    dishes: [
      { name: "Traditional Masala Dosa", quantity: 3, price: 135, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=200" },
      { name: "Coconut Chutney", quantity: 1, price: 45, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=200" }
    ],
    total: 450,
    rating: 4,
    packageType: "Temperature Controlled Box"
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

              {/* Dish Items with Images */}
              <div className="space-y-3">
                {order.dishes.map((dish, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                    <img 
                      src={dish.image} 
                      alt={dish.name} 
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{dish.quantity}x {dish.name}</span>
                        <span className="font-bold text-sm">₹{dish.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Package Information */}
              {order.status === "delivered" && (
                <div className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg border border-green-200">
                  <Package className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700">Delivered in: {order.packageType}</span>
                </div>
              )}

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
