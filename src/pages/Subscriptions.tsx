
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
  image: string;
  price: number;
}

const mockMeals: ScheduledMeal[] = [
  {
    date: "2025-06-16",
    mealType: "Lunch",
    dish: "Sarson da Saag",
    cook: "Aunty Manjeet",
    status: "scheduled",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=400",
    price: 140,
  },
  {
    date: "2025-06-16",
    mealType: "Dinner",
    dish: "Masala Dosa",
    cook: "Meena Amma",
    status: "scheduled",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=400",
    price: 120,
  },
  {
    date: "2025-06-17",
    mealType: "Lunch",
    dish: "Kosha Mangsho",
    cook: "Mala Di",
    status: "paused",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=400",
    price: 180,
  },
  {
    date: "2025-06-18",
    mealType: "Breakfast",
    dish: "Idli & Sambar",
    cook: "Meena Amma",
    status: "scheduled",
    image: "https://images.unsplash.com/photo-1626132647346-f4d2f2d0a5f0?q=80&w=400",
    price: 80,
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
            <div className="space-y-4">
              {meals.map((meal, idx) => (
                <div key={meal.date + meal.mealType + idx} className="bg-secondary/30 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center space-x-4">
                    {/* Meal Image */}
                    <img 
                      src={meal.image} 
                      alt={meal.dish} 
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    
                    {/* Meal Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-primary truncate">{meal.dish}</h3>
                        <Badge 
                          variant={meal.status === "paused" ? "outline" : "default"} 
                          className={`${meal.status === "paused" ? "border-destructive text-destructive" : ""} ml-2 flex-shrink-0`}
                        >
                          {meal.status === "paused" ? "Paused" : meal.status === "delivered" ? "Delivered" : "Active"}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        by {meal.cook} • ₹{meal.price}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">
                          {meal.date} • {meal.mealType}
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEdit(meal.date, meal.mealType)}
                            className="h-8 px-3"
                          >
                            <Edit2 className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handlePause(meal.date, meal.mealType)}
                            className="h-8 px-3"
                          >
                            {meal.status === "paused" ? (
                              <>
                                <Play className="h-3 w-3 mr-1 text-green-600" />
                                Resume
                              </>
                            ) : (
                              <>
                                <Pause className="h-3 w-3 mr-1 text-orange-500" />
                                Pause
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-xs text-muted-foreground mt-4 italic text-center">
              Tip: You can pause, resume, or edit your meals anytime. More advanced scheduling and analytics coming soon!
            </div>
          </CardContent>
        </Card>
        
        <Button 
          className="w-full mt-2 bg-accent text-accent-foreground hover:bg-accent/80 font-serif font-bold rounded-xl"
          onClick={() => navigate('/discover')}
        >
          + Add New Subscription
        </Button>
      </main>
    </div>
  );
};

export default Subscriptions;
