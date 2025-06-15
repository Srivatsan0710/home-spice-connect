
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react";

const SubscriptionAnalytics = () => {
  const analytics = {
    totalSpent: 8450,
    mealsOrdered: 124,
    favoriteCuisine: "Bengali",
    avgMealCost: 185,
    topDishes: [
      { name: "Fish Curry", orders: 12, cost: 2160 },
      { name: "Butter Chicken", orders: 8, cost: 1760 },
      { name: "Biryani", orders: 7, cost: 2100 }
    ],
    monthlyTrend: { current: 2850, previous: 2340, change: 21.8 },
    nutritionalBreakdown: {
      protein: 32,
      carbs: 45,
      fat: 23
    }
  };

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">₹{analytics.totalSpent}</p>
            <p className="text-xs text-muted-foreground">Total Spent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">{analytics.mealsOrdered}</p>
            <p className="text-xs text-muted-foreground">Meals Ordered</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Monthly Spending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">₹{analytics.monthlyTrend.current}</p>
              <p className="text-sm text-muted-foreground">This month</p>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-green-600 font-medium">
                +{analytics.monthlyTrend.change}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Dishes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Favorite Dishes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {analytics.topDishes.map((dish, index) => (
            <div key={dish.name} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{dish.name}</p>
                <p className="text-sm text-muted-foreground">{dish.orders} orders</p>
              </div>
              <Badge variant="outline">₹{dish.cost}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Nutritional Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Nutritional Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(analytics.nutritionalBreakdown).map(([nutrient, percentage]) => (
              <div key={nutrient}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize">{nutrient}</span>
                  <span>{percentage}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionAnalytics;
