
import { useState } from "react";
import { Heart, Brain, Clock, TrendingUp, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserPreferences } from "@/contexts/UserPreferencesContext";

const Personalization = () => {
  const { preferences, updatePreferences } = useUserPreferences();
  const [homesicknessAlerts, setHomesicknessAlerts] = useState(true);
  
  const aiRecommendations = [
    { dish: "Fish Curry", reason: "You order Bengali food 70% of the time", confidence: 95 },
    { dish: "Butter Chicken", reason: "Popular during weekend evenings", confidence: 88 },
    { dish: "Masala Dosa", reason: "You prefer South Indian breakfast", confidence: 92 }
  ];

  const favoriteDishe = [
    { name: "Fish Curry", orders: 12, lastOrdered: "2 days ago" },
    { name: "Rajma Chawal", orders: 8, lastOrdered: "1 week ago" },
    { name: "Biryani", orders: 6, lastOrdered: "3 days ago" }
  ];

  const mealPlans = [
    { name: "Bengali Thali Plan", duration: "Weekly", price: 1200, dishes: 7 },
    { name: "South Indian Comfort", duration: "Monthly", price: 4800, dishes: 30 },
    { name: "Punjabi Feast", duration: "Bi-weekly", price: 2200, dishes: 14 }
  ];

  return (
    <div className="flex flex-col min-h-full bg-secondary/30">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Personalization</h1>
              <p className="text-sm text-muted-foreground">AI-powered recommendations just for you</p>
            </div>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4">
        <Tabs defaultValue="recommendations">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="recommendations">AI Picks</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="plans">Meal Plans</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="space-y-4">
            {/* Homesickness Alert */}
            <Card className="border-l-4 border-l-amber-400 bg-amber-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Heart className="h-5 w-5 text-amber-600" />
                  <h3 className="font-semibold text-amber-800">Homesickness Alert</h3>
                </div>
                <p className="text-sm text-amber-700 mb-3">
                  We noticed it's Durga Puja season! Missing home? Try these Bengali comfort foods.
                </p>
                <div className="flex space-x-2">
                  <Badge className="bg-amber-100 text-amber-800">Fish Curry</Badge>
                  <Badge className="bg-amber-100 text-amber-800">Mishti Doi</Badge>
                  <Badge className="bg-amber-100 text-amber-800">Khichuri</Badge>
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <span>AI Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiRecommendations.map((rec, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{rec.dish}</h4>
                      <p className="text-sm text-muted-foreground">{rec.reason}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-16 bg-secondary rounded-full h-1.5">
                          <div 
                            className="bg-primary h-1.5 rounded-full" 
                            style={{ width: `${rec.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{rec.confidence}% match</span>
                      </div>
                    </div>
                    <Button size="sm">Order</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Favorite Dishes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {favoriteDishe.map((dish, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{dish.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {dish.orders} orders • Last ordered {dish.lastOrdered}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm">Reorder</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Meal Plans</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mealPlans.map((plan, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{plan.name}</h4>
                        <Badge variant="outline">{plan.duration}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {plan.dishes} dishes • ₹{plan.price}
                      </p>
                      <Button size="sm" className="w-full">Subscribe</Button>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personalization Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Homesickness Alerts</h4>
                    <p className="text-sm text-muted-foreground">Get comfort food suggestions during festivals</p>
                  </div>
                  <Switch checked={homesicknessAlerts} onCheckedChange={setHomesicknessAlerts} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Smart Recommendations</h4>
                    <p className="text-sm text-muted-foreground">AI-powered dish suggestions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Learning Mode</h4>
                    <p className="text-sm text-muted-foreground">Let AI learn your taste preferences</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Personalization;
