
import { Card } from "@/components/ui/card";
import { Star, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Cook {
  id: string;
  name: string;
  location: string;
  specialties: string[];
  rating: number;
  totalOrders: number;
  image: string;
  distance: string;
}

const TopRatedCooksSection = () => {
  const navigate = useNavigate();

  // Mock user preferences based on order history and location
  const userPreferences = {
    location: "Chennai",
    region: "South India",
    preferredCuisines: ["South Indian", "Punjabi"], // Max 2 as requested
  };

  // Top rated cooks based on user preferences
  const topRatedCooks: Cook[] = [
    {
      id: "meera-amma",
      name: "Meera Amma",
      location: "T. Nagar, Chennai",
      specialties: ["South Indian", "Tamil"],
      rating: 4.9,
      totalOrders: 850,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=150",
      distance: "1.2 km"
    },
    {
      id: "aunty-manjeet",
      name: "Aunty Manjeet",
      location: "Koramangala, Bangalore",
      specialties: ["Punjabi", "North Indian"],
      rating: 4.8,
      totalOrders: 720,
      image: "https://images.unsplash.com/photo-1494790108755-2616c36a8db1?q=80&w=150",
      distance: "2.8 km"
    },
    {
      id: "priya-aunty",
      name: "Priya Aunty",
      location: "Adyar, Chennai",
      specialties: ["South Indian", "Kerala"],
      rating: 4.8,
      totalOrders: 650,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150",
      distance: "0.8 km"
    }
  ];

  const handleCookClick = (cookId: string) => {
    navigate(`/cook/${cookId}/profile`);
  };

  const getCuisineText = () => {
    if (userPreferences.preferredCuisines.length === 1) {
      return userPreferences.preferredCuisines[0];
    }
    return userPreferences.preferredCuisines.join(", ");
  };

  return (
    <section className="mt-6">
      <div className="px-4 mb-4">
        <h2 className="text-xl font-bold font-serif mb-1">
          Top Rated Cooks for You
        </h2>
        <p className="text-sm text-muted-foreground">
          Based on your preferences for {getCuisineText()} food in {userPreferences.location}
        </p>
      </div>
      
      <div className="flex space-x-4 overflow-x-auto px-4 -mt-2">
        {topRatedCooks.map((cook) => (
          <Card 
            key={cook.id}
            className="w-56 flex-shrink-0 overflow-hidden rounded-xl border-secondary cursor-pointer transition-shadow hover:shadow-lg"
            onClick={() => handleCookClick(cook.id)}
          >
            <div className="relative">
              <img 
                src={cook.image} 
                alt={cook.name} 
                className="h-32 w-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-bold">{cook.rating}</span>
              </div>
            </div>
            
            <div className="p-3">
              <h3 className="font-bold text-md font-serif">{cook.name}</h3>
              
              <div className="flex items-center space-x-1 mb-2">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {cook.location} • {cook.distance}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-2">
                {cook.specialties.slice(0, 2).map((specialty) => (
                  <span 
                    key={specialty}
                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              
              <div className="text-xs text-muted-foreground">
                {cook.totalOrders}+ orders completed
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TopRatedCooksSection;
