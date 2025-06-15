
import { ArrowLeft, Bell, Globe, Shield, CreditCard, HelpCircle, LogOut, Moon, Sun, MapPin, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserPreferences } from "@/contexts/UserPreferencesContext";

const Settings = () => {
  const navigate = useNavigate();
  const { preferences, updatePreferences } = useUserPreferences();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);

  const cuisineOptions = ["Punjabi", "Bengali", "South Indian", "Gujarati", "Rajasthani", "North Indian", "Chinese", "Continental"];
  const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", "Low-Carb"];
  const spiceLevels = ["mild", "medium", "hot", "very-hot"];

  const toggleCuisine = (cuisine: string) => {
    const updated = preferences.favoriteCuisines.includes(cuisine)
      ? preferences.favoriteCuisines.filter(c => c !== cuisine)
      : [...preferences.favoriteCuisines, cuisine];
    updatePreferences({ favoriteCuisines: updated });
  };

  const toggleDietary = (diet: string) => {
    const updated = preferences.dietaryRestrictions.includes(diet)
      ? preferences.dietaryRestrictions.filter(d => d !== diet)
      : [...preferences.dietaryRestrictions, diet];
    updatePreferences({ dietaryRestrictions: updated });
  };

  return (
    <div className="pb-16">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 p-4 backdrop-blur-sm border-b">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-amber-800">Settings</h1>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* App Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>App Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-sage-600" />
                <span>Push Notifications</span>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-sage-600" />
                <span>Location Sharing</span>
              </div>
              <Switch checked={locationSharing} onCheckedChange={setLocationSharing} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {darkMode ? <Moon className="h-5 w-5 text-sage-600" /> : <Sun className="h-5 w-5 text-sage-600" />}
                <span>Dark Mode</span>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </CardContent>
        </Card>

        {/* Food Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Food Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Favorite Cuisines</h4>
              <div className="flex flex-wrap gap-2">
                {cuisineOptions.map((cuisine) => (
                  <Badge
                    key={cuisine}
                    variant={preferences.favoriteCuisines.includes(cuisine) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      preferences.favoriteCuisines.includes(cuisine)
                        ? "bg-amber-600 text-white"
                        : "text-sage-700 hover:bg-sage-100"
                    }`}
                    onClick={() => toggleCuisine(cuisine)}
                  >
                    {cuisine}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Dietary Restrictions</h4>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map((diet) => (
                  <Badge
                    key={diet}
                    variant={preferences.dietaryRestrictions.includes(diet) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      preferences.dietaryRestrictions.includes(diet)
                        ? "bg-emerald-600 text-white"
                        : "text-sage-700 hover:bg-sage-100"
                    }`}
                    onClick={() => toggleDietary(diet)}
                  >
                    {diet}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Spice Level</h4>
              <div className="flex flex-wrap gap-2">
                {spiceLevels.map((level) => (
                  <Badge
                    key={level}
                    variant={preferences.spiceLevel === level ? "default" : "outline"}
                    className={`cursor-pointer ${
                      preferences.spiceLevel === level
                        ? "bg-red-600 text-white"
                        : "text-sage-700 hover:bg-sage-100"
                    }`}
                    onClick={() => updatePreferences({ spiceLevel: level as any })}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Account</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <CreditCard className="h-4 w-4 mr-2" />
              Payment Methods
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Privacy & Security
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Globe className="h-4 w-4 mr-2" />
              Language & Region
            </Button>
          </CardContent>
        </Card>

        {/* Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HelpCircle className="h-5 w-5" />
              <span>Support</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <HelpCircle className="h-4 w-4 mr-2" />
              Help Center
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Contact Support
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Report a Problem
            </Button>
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

export default Settings;
