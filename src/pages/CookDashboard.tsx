
import { useState } from "react";
import { Plus, Edit, Trash2, Eye, TrendingUp, Users, DollarSign, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const mockCookData = {
  name: "Aunty Manjeet",
  totalOrders: 1245,
  totalRevenue: 45600,
  rating: 4.9,
  dishes: [
    {
      id: "1",
      name: "Aloo Paratha Special",
      price: 150,
      orders: 89,
      rating: 4.8,
      status: "active",
      image: "https://images.unsplash.com/photo-1626157497979-6a7c5c07c12a?q=80&w=400"
    },
    {
      id: "2",
      name: "Sarson da Saag",
      price: 180,
      orders: 67,
      rating: 4.9,
      status: "active",
      image: "https://images.unsplash.com/photo-1626520245059-54a2a1061b4d?q=80&w=400"
    }
  ]
};

const CookDashboard = () => {
  const [dishes, setDishes] = useState(mockCookData.dishes);
  const [newDish, setNewDish] = useState({
    name: "",
    price: "",
    description: "",
    image: ""
  });

  const handleAddDish = () => {
    if (newDish.name && newDish.price) {
      const dish = {
        id: String(dishes.length + 1),
        name: newDish.name,
        price: parseInt(newDish.price),
        orders: 0,
        rating: 0,
        status: "active" as const,
        image: newDish.image || "https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=400"
      };
      setDishes([...dishes, dish]);
      setNewDish({ name: "", price: "", description: "", image: "" });
    }
  };

  const statsCards = [
    { title: "Total Orders", value: mockCookData.totalOrders, icon: TrendingUp, color: "text-blue-600" },
    { title: "Revenue", value: `₹${mockCookData.totalRevenue}`, icon: DollarSign, color: "text-green-600" },
    { title: "Rating", value: mockCookData.rating, icon: Star, color: "text-yellow-600" },
    { title: "Active Dishes", value: dishes.length, icon: Users, color: "text-purple-600" }
  ];

  return (
    <div className="pb-16">
      <header className="bg-gradient-to-r from-amber-50 to-orange-50 p-6">
        <h1 className="text-2xl font-bold text-amber-800">Cook Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back, {mockCookData.name}!</p>
      </header>

      <div className="p-4 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          {statsCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-lg font-bold">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Dishes Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Dishes</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Dish
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Dish</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="dishName">Dish Name</Label>
                      <Input
                        id="dishName"
                        value={newDish.name}
                        onChange={(e) => setNewDish({...newDish, name: e.target.value})}
                        placeholder="Enter dish name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dishPrice">Price (₹)</Label>
                      <Input
                        id="dishPrice"
                        type="number"
                        value={newDish.price}
                        onChange={(e) => setNewDish({...newDish, price: e.target.value})}
                        placeholder="Enter price"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dishDescription">Description</Label>
                      <Textarea
                        id="dishDescription"
                        value={newDish.description}
                        onChange={(e) => setNewDish({...newDish, description: e.target.value})}
                        placeholder="Describe your dish"
                      />
                    </div>
                    <Button onClick={handleAddDish} className="w-full">
                      Add Dish
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dishes.map((dish) => (
                <div key={dish.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                  <img src={dish.image} alt={dish.name} className="h-16 w-16 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-medium">{dish.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>₹{dish.price}</span>
                      <span>•</span>
                      <span>{dish.orders} orders</span>
                      {dish.rating > 0 && (
                        <>
                          <span>•</span>
                          <span className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                            {dish.rating}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={dish.status === "active" ? "default" : "secondary"}>
                      {dish.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CookDashboard;
