
import { useState } from "react";
import { Calendar, Clock, Plus, Settings, BarChart3, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import WeeklyMealPlan from "@/components/WeeklyMealPlan";
import SubscriptionAnalytics from "@/components/SubscriptionAnalytics";
import BulkScheduler from "@/components/BulkScheduler";

const MealPlanning = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const navigate = useNavigate();

  const quickActions = [
    { label: "Schedule Today's Meals", icon: Clock, action: () => {} },
    { label: "Weekly Meal Plan", icon: Calendar, action: () => setActiveTab("weekly") },
    { label: "Bulk Schedule", icon: Plus, action: () => setActiveTab("bulk") },
    { label: "View Analytics", icon: BarChart3, action: () => setActiveTab("analytics") },
  ];

  return (
    <div className="flex flex-col min-h-full bg-secondary/30">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold">Meal Planning</h1>
              <p className="text-sm text-muted-foreground">Schedule and manage your meal subscriptions</p>
            </div>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={action.action}>
              <CardContent className="p-4 text-center">
                <action.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">{action.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="bulk">Bulk</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Today's Meal Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Breakfast', 'Lunch', 'Dinner'].map((meal) => (
                  <div key={meal} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{meal}</p>
                      <p className="text-sm text-muted-foreground">
                        {meal === 'Breakfast' ? '7:00-10:00 AM' : 
                         meal === 'Lunch' ? '12:00-2:00 PM' : '7:00-9:00 PM'}
                      </p>
                    </div>
                    <Button size="sm">Schedule</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly">
            <WeeklyMealPlan />
          </TabsContent>

          <TabsContent value="bulk">
            <BulkScheduler />
          </TabsContent>

          <TabsContent value="analytics">
            <SubscriptionAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MealPlanning;
