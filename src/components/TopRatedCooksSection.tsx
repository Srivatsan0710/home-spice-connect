
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Cook {
  id: string;
  name: string;
  region: string;
  specialty: string;
  rating: number;
  image: string;
}

const TopRatedCooksSection = () => {
  const navigate = useNavigate();

  // Mock user preferences based on order history and location
  const userPreferences = {
    location: "Chennai",
    region: "South India",
    preferredCuisines: ["South Indian", "Punjabi"], // Max 2 as requested
  };

  // Top rated chefs based on user preferences
  const topRatedCooks: Cook[] = [
    {
      id: "meera-amma",
      name: "Meera Amma",
      region: "Tamil Nadu",
      specialty: "South Indian",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1494790108755-2616c36a8db1?q=80&w=400"
    },
    {
      id: "aunty-manjeet",
      name: "Aunty Manjeet",
      region: "Punjab",
      specialty: "Punjabi",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400"
    },
    {
      id: "priya-aunty",
      name: "Priya Aunty",
      region: "Kerala",
      specialty: "South Indian",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400"
    }
  ];

  const handleCookClick = (cookId: string) => {
    navigate(`/cook/${cookId}`);
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
          Top Rated Chefs for You
        </h2>
        <p className="text-sm text-muted-foreground">
          Based on your preferences for {getCuisineText()} food
        </p>
      </div>
      
      <div className="flex space-x-4 overflow-x-auto px-4 -mt-2">
        {topRatedCooks.map((cook) => (
          <Card 
            key={cook.id}
            className="w-48 flex-shrink-0 overflow-hidden rounded-xl border-secondary transition-shadow hover:shadow-lg cursor-pointer"
            onClick={() => handleCookClick(cook.id)}
          >
            <img src={cook.image} alt={cook.name} className="h-32 w-full object-cover" />
            <CardContent className="p-3">
              <h3 className="font-bold text-md">{cook.name}</h3>
              <p className="text-sm text-muted-foreground">
                {cook.region} | {cook.specialty}
              </p>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="ml-1 text-sm font-bold">{cook.rating}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TopRatedCooksSection;
