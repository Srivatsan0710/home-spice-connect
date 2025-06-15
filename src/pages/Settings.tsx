
import { ArrowLeft, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserPreferences } from "@/contexts/UserPreferencesContext";
import { useToast } from "@/hooks/use-toast";

const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", "Paleo"];
const cuisineOptions = ["Punjabi", "Bengali", "South Indian", "Gujarati", "Rajasthani", "North Indian", "Chinese", "Continental"];
const spiceLevels = ["mild", "medium", "hot", "very-hot"];
const budgetRanges = ["Under ₹150", "₹150 - ₹300", "₹300 - ₹500", "Above ₹500"];
const mealTimeOptions = ["Breakfast", "Lunch", "Dinner", "Snacks", "Brunch"];
const allergenOptions = ["Nuts", "Shellfish", "Eggs", "Soy", "Fish", "Sesame"];
const cookingStyleOptions = ["Traditional", "Fusion", "Healthy", "Comfort Food", "Street Food"];

const Settings = () => {
  const navigate = useNavigate();
  const { preferences, updatePreferences } = useUserPreferences();
  const { toast } = useToast();
  const [localPreferences, setLocalPreferences] = useState(preferences);

  const toggleArrayItem = (array: string[], item: string): string[] => {
    return array.includes(item) 
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  const handleSave = () => {
    updatePreferences(localPreferences);
    toast({
      title: "Preferences saved!",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="pb-16">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold text-amber-800">Settings</h1>
          </div>
          <Button onClick={handleSave} className="bg-amber-600 hover:bg-amber-700">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Dietary Restrictions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-amber-800">Dietary Restrictions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {dietaryOptions.map((option) => (
                <Badge
                  key={option}
                  variant={localPreferences.dietaryRestrictions.includes(option) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    localPreferences.dietaryRestrictions.includes(option)
                      ? "bg-amber-600 text-white"
                      : "text-sage-700 hover:bg-sage-100"
                  }`}
                  onClick={() => setLocalPreferences(prev => ({
                    ...prev,
                    dietaryRestrictions: toggleArrayItem(prev.dietaryRestrictions, option)
                  }))}
                >
                  {option}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Favorite Cuisines */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-amber-800">Favorite Cuisines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {cuisineOptions.map((cuisine) => (
                <Badge
                  key={cuisine}
                  variant={localPreferences.favoriteCuisines.includes(cuisine) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    localPreferences.favoriteCuisines.includes(cuisine)
                      ? "bg-amber-600 text-white"
                      : "text-sage-700 hover:bg-sage-100"
                  }`}
                  onClick={() => setLocalPreferences(prev => ({
                    ...prev,
                    favoriteCuisines: toggleArrayItem(prev.favoriteCuisines, cuisine)
                  }))}
                >
                  {cuisine}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Spice Level */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-amber-800">Spice Preference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {spiceLevels.map((level) => (
                <Badge
                  key={level}
                  variant={localPreferences.spiceLevel === level ? "default" : "outline"}
                  className={`cursor-pointer capitalize ${
                    localPreferences.spiceLevel === level
                      ? "bg-amber-600 text-white"
                      : "text-sage-700 hover:bg-sage-100"
                  }`}
                  onClick={() => setLocalPreferences(prev => ({
                    ...prev,
                    spiceLevel: level as typeof prev.spiceLevel
                  }))}
                >
                  {level.replace('-', ' ')}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Budget Range */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-amber-800">Budget Range</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {budgetRanges.map((range) => (
                <Badge
                  key={range}
                  variant={localPreferences.budgetRange === range ? "default" : "outline"}
                  className={`cursor-pointer ${
                    localPreferences.budgetRange === range
                      ? "bg-amber-600 text-white"
                      : "text-sage-700 hover:bg-sage-100"
                  }`}
                  onClick={() => setLocalPreferences(prev => ({
                    ...prev,
                    budgetRange: prev.budgetRange === range ? "" : range
                  }))}
                >
                  {range}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Meal Times */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-amber-800">Preferred Meal Times</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {mealTimeOptions.map((time) => (
                <Badge
                  key={time}
                  variant={localPreferences.mealTimes.includes(time) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    localPreferences.mealTimes.includes(time)
                      ? "bg-amber-600 text-white"
                      : "text-sage-700 hover:bg-sage-100"
                  }`}
                  onClick={() => setLocalPreferences(prev => ({
                    ...prev,
                    mealTimes: toggleArrayItem(prev.mealTimes, time)
                  }))}
                >
                  {time}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Allergens */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-amber-800">Allergens to Avoid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {allergenOptions.map((allergen) => (
                <Badge
                  key={allergen}
                  variant={localPreferences.allergens.includes(allergen) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    localPreferences.allergens.includes(allergen)
                      ? "bg-red-600 text-white"
                      : "text-sage-700 hover:bg-sage-100"
                  }`}
                  onClick={() => setLocalPreferences(prev => ({
                    ...prev,
                    allergens: toggleArrayItem(prev.allergens, allergen)
                  }))}
                >
                  {allergen}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cooking Style */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-amber-800">Preferred Cooking Styles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {cookingStyleOptions.map((style) => (
                <Badge
                  key={style}
                  variant={localPreferences.cookingStyle.includes(style) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    localPreferences.cookingStyle.includes(style)
                      ? "bg-amber-600 text-white"
                      : "text-sage-700 hover:bg-sage-100"
                  }`}
                  onClick={() => setLocalPreferences(prev => ({
                    ...prev,
                    cookingStyle: toggleArrayItem(prev.cookingStyle, style)
                  }))}
                >
                  {style}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
