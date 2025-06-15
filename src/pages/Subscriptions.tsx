
import { CalendarDays, Pause, Play, Edit2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type MealType = "Breakfast" | "Lunch" | "Dinner";

interface ScheduledMeal {
  date: string;
  mealType: MealType;
  dish: string;
  cook: string;
  status: "scheduled" | "paused" | "delivered";
}

const mockMeals: ScheduledMeal[] = [
  {
    date: "2025-06-16",
    mealType: "Lunch",
    dish: "Sarson da Saag",
    cook: "Aunty Manjeet",
    status: "scheduled",
  },
  {
    date: "2025-06-16",
    mealType: "Dinner",
    dish: "Masala Dosa",
    cook: "Meena Amma",
    status: "scheduled",
  },
  {
    date: "2025-06-17",
    mealType: "Lunch",
    dish: "Kosha Mangsho",
    cook: "Mala Di",
    status: "paused",
  },
  {
    date: "2025-06-18",
    mealType: "Breakfast",
    dish: "Idli & Sambar",
    cook: "Meena Amma",
    status: "scheduled",
  },
];

const Subscriptions = () => {
  const [meals, setMeals] = useState<ScheduledMeal[]>(mockMeals);
  const navigate = useNavigate();

  const handlePause = (date: string, mealType: MealType) => {
    setMeals(prev =>
      prev.map(m =>
        m.date === date && m.mealType === mealType
          ? { ...m, status: m.status === "paused" ? "scheduled" : "paused" }
          : m
      )
    );
  };

  const handleEdit = (date: string, mealType: MealType) => {
    // For now, just log. Future: open edit dialog
    alert("Edit feature coming soon!");
  };

  return (
    <div className="pb-16">
      <header className="sticky top-0 z-10 bg-background/80 p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold font-serif text-primary">Meal Subscriptions</h1>
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <CalendarDays className="h-6 w-6" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">Schedule and manage your daily/weekly meals</p>
      </header>

      <main className="p-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Your Upcoming Meals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {meals.map((meal, idx) => (
                <div key={meal.date + meal.mealType + idx} className="flex items-center justify-between rounded-xl bg-secondary/30 p-3 shadow-sm">
                  <div>
                    <div className="font-semibold">{meal.date} • {meal.mealType}</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-primary font-bold">{meal.dish}</span>
                      <span className="text-xs text-muted-foreground">by {meal.cook}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Badge variant={meal.status === "paused" ? "outline" : "default"} className={meal.status === "paused" ? "border-destructive text-destructive" : ""}>
                      {meal.status === "paused" ? "Paused" : meal.status === "delivered" ? "Delivered" : "Active"}
                    </Badge>
                    <Button variant="outline" size="icon" onClick={() => handleEdit(meal.date, meal.mealType)} className="ml-1">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handlePause(meal.date, meal.mealType)} className="ml-1">
                      {meal.status === "paused" ? <Play className="h-4 w-4 text-green-600" /> : <Pause className="h-4 w-4 text-orange-500" />}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-xs text-muted-foreground mt-4 italic">
              Tip: You can pause, resume, or edit your meals anytime. More advanced scheduling and analytics coming soon!
            </div>
          </CardContent>
        </Card>
        <Button className="w-full mt-2 bg-accent text-accent-foreground hover:bg-accent/80 font-serif font-bold rounded-xl">
          + Add New Subscription
        </Button>
      </main>
    </div>
  );
};
export default Subscriptions;
