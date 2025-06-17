
import { CalendarDays, X, Play, Pause } from "lucide-react";
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
    dish: "Authentic Sarson da Saag",
    cook: "Chef Gurpreet Singh",
    status: "scheduled",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=400",
    price: 160,
  },
  {
    date: "2025-06-16",
    mealType: "Dinner",
    dish: "Traditional Masala Dosa",
    cook: "Chef Lakshmi Narayanan",
    status: "scheduled",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=400",
    price: 135,
  },
  {
    date: "2025-06-17",
    mealType: "Lunch",
    dish: "Bengali Fish Curry",
    cook: "Chef Shilpa Banerjee",
    status: "paused",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=400",
    price: 200,
  },
  {
    date: "2025-06-18",
    mealType: "Breakfast",
    dish: "South Indian Idli Sambar",
    cook: "Chef Meera Krishnan",
    status: "scheduled",
    image: "https://images.unsplash.com/photo-1626132647346-f4d2f2d0a5f0?q=80&w=400",
    price: 90,
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

  const handleCancel = (date: string, mealType: MealType) => {
    setMeals(prev => prev.filter(m => !(m.date === date && m.mealType === mealType)));
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
        <p className="text-sm text-muted-foreground">Manage your scheduled meals and subscriptions</p>
      </header>

      <main className="p-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Your Upcoming Meals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {meals.map((meal, idx) => (
                <div key={meal.date + meal.mealType + idx} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-start space-x-4">
                    {/* Meal Image */}
                    <img 
                      src={meal.image} 
                      alt={meal.dish} 
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    
                    {/* Meal Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-bold text-primary text-lg mb-1">{meal.dish}</h3>
                          <p className="text-sm text-muted-foreground mb-1">by {meal.cook}</p>
                          <p className="text-lg font-bold text-primary">₹{meal.price}</p>
                        </div>
                        <Badge 
                          variant={meal.status === "paused" ? "outline" : "default"} 
                          className={`${meal.status === "paused" ? "border-orange-500 text-orange-600" : "bg-green-100 text-green-700"} ml-2`}
                        >
                          {meal.status === "paused" ? "Paused" : meal.status === "delivered" ? "Delivered" : "Active"}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-gray-700">
                          {meal.date} • {meal.mealType}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons - Separated and aligned */}
                  <div className="flex items-center justify-end space-x-3 mt-4 pt-3 border-t border-gray-100">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handlePause(meal.date, meal.mealType)}
                      className="flex items-center space-x-2"
                    >
                      {meal.status === "paused" ? (
                        <>
                          <Play className="h-4 w-4 text-green-600" />
                          <span>Resume</span>
                        </>
                      ) : (
                        <>
                          <Pause className="h-4 w-4 text-orange-500" />
                          <span>Pause</span>
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCancel(meal.date, meal.mealType)}
                      className="flex items-center space-x-2 text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-sm text-muted-foreground mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">💡 Helpful Tips:</h4>
              <ul className="space-y-1 text-blue-700">
                <li>• Pause subscriptions anytime when traveling or taking a break</li>
                <li>• Cancel individual meals up to 12 hours before scheduled delivery</li>
                <li>• All paused subscriptions can be resumed with one click</li>
                <li>• Get notified 2 hours before each meal preparation starts</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Button 
          className="w-full mt-4 bg-primary text-white hover:bg-primary/90 font-serif font-bold rounded-xl py-3"
          onClick={() => navigate('/discover')}
        >
          + Add New Subscription
        </Button>
      </main>
    </div>
  );
};

export default Subscriptions;
