
import { User, MapPin, Settings, Heart, Clock, Gift, Bell, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import SubscriptionCard from "@/components/SubscriptionCard";

const Profile = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Settings, label: "Preferences & Settings", action: () => navigate('/settings') },
    { icon: Heart, label: "Favorites", action: () => {} },
    { icon: Clock, label: "Order History", action: () => navigate('/orders') },
    { icon: Gift, label: "Meal Subscriptions", action: () => navigate('/subscriptions') },
    { icon: Bell, label: "Notifications", action: () => {} },
    { icon: HelpCircle, label: "Help & Support", action: () => {} },
  ];

  // Sample subscription data
  const subscriptions = [
    {
      id: "sub1",
      dishName: "Morning Poha",
      cookName: "Meera Aunty",
      price: 80,
      frequency: "weekly" as const,
      status: "active" as const,
      nextDelivery: "Tomorrow 8:00 AM",
      image: "https://images.unsplash.com/photo-1626132647346-f4d2f2d0a5f0?q=80&w=400"
    },
    {
      id: "sub2",
      dishName: "Ghar Jaisa Rajma Chawal",
      cookName: "Aunty Priya",
      price: 120,
      frequency: "monthly" as const,
      status: "paused" as const,
      nextDelivery: "Paused",
      image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=400"
    }
  ];

  return (
    <div className="pb-16">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-50 to-orange-50 p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150" />
            <AvatarFallback>RK</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold text-amber-800">Rajesh Kumar</h1>
            <div className="flex items-center space-x-1 mt-1">
              <MapPin className="h-4 w-4 text-sage-600" />
              <span className="text-sm text-sage-600">Koramangala, Bangalore</span>
            </div>
            <Badge className="mt-2 bg-emerald-100 text-emerald-700">Food Explorer</Badge>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="text-center">
            <CardContent className="p-3">
              <p className="text-xl font-bold text-amber-700">127</p>
              <p className="text-xs text-muted-foreground">Orders</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-3">
              <p className="text-xl font-bold text-amber-700">23</p>
              <p className="text-xs text-muted-foreground">Favorites</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-3">
              <p className="text-xl font-bold text-amber-700">8</p>
              <p className="text-xs text-muted-foreground">Reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Subscriptions */}
        {subscriptions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-amber-800 flex items-center justify-between">
                <span>Active Subscriptions</span>
                <Button variant="ghost" size="sm" onClick={() => navigate('/subscriptions')}>
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {subscriptions.slice(0, 2).map((subscription) => (
                <SubscriptionCard key={subscription.id} subscription={subscription} />
              ))}
            </CardContent>
          </Card>
        )}

        {/* Menu Items */}
        <Card>
          <CardContent className="p-0">
            {menuItems.map((item, index) => (
              <div
                key={item.label}
                className={`flex items-center justify-between p-4 cursor-pointer hover:bg-sage-50 ${
                  index !== menuItems.length - 1 ? 'border-b border-sage-100' : ''
                }`}
                onClick={item.action}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-5 w-5 text-sage-600" />
                  <span className="text-sage-800">{item.label}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-sage-400" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Account Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-amber-800">Account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sage-700">Email</span>
                <span className="text-sm text-muted-foreground">rajesh.kumar@email.com</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sage-700">Phone</span>
                <span className="text-sm text-muted-foreground">+91 98765 43210</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sage-700">Member Since</span>
                <span className="text-sm text-muted-foreground">January 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
