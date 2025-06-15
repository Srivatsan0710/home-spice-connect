
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";

const WeeklyMealPlan = () => {
  const [weeklyPlan, setWeeklyPlan] = useState({
    Monday: { breakfast: null, lunch: "Rajma Chawal", dinner: "Rotis with Sabzi" },
    Tuesday: { breakfast: "Poha", lunch: null, dinner: "Fish Curry" },
    Wednesday: { breakfast: null, lunch: "Biryani", dinner: null },
    Thursday: { breakfast: "Idli Sambar", lunch: "Dal Rice", dinner: "Chicken Curry" },
    Friday: { breakfast: null, lunch: null, dinner: "Paneer Makhani" },
    Saturday: { breakfast: "Paratha", lunch: "Chole Bhature", dinner: null },
    Sunday: { breakfast: "Dosa", lunch: "Pulao", dinner: "Mutton Curry" }
  });

  const days = Object.keys(weeklyPlan);
  const mealTypes = ['breakfast', 'lunch', 'dinner'];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Weekly Meal Plan
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Plan
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {days.map((day) => (
              <Card key={day} className="border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <h3 className="font-semibold">{day}</h3>
                </CardHeader>
                <CardContent className="space-y-2">
                  {mealTypes.map((mealType) => {
                    const meal = weeklyPlan[day as keyof typeof weeklyPlan][mealType as keyof typeof weeklyPlan.Monday];
                    return (
                      <div key={mealType} className="flex items-center justify-between p-2 bg-secondary/20 rounded">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="capitalize text-xs">
                            {mealType}
                          </Badge>
                          <span className="text-sm">
                            {meal || "Not scheduled"}
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          {meal ? (
                            <>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </>
                          ) : (
                            <Button variant="ghost" size="sm">
                              <Plus className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyMealPlan;
