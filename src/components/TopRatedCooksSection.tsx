
import CookCard from "@/components/CookCard";

interface Cook {
  id: string;
  name: string;
  region: string;
  specialty: string;
  rating: number;
  image: string;
}

const TopRatedCooksSection = () => {
  // Mock user preferences based on order history and location
  const userPreferences = {
    location: "Chennai",
    region: "South India",
    preferredCuisines: ["South Indian", "Punjabi"], // Max 2 as requested
  };

  // Top rated chefs with existing IDs that match the cook data
  const topRatedCooks: Cook[] = [
    {
      id: "meena-amma",
      name: "Chef Meera Krishnan",
      region: "Tamil Nadu",
      specialty: "South Indian",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1494790108755-2616c36a8db1?q=80&w=400"
    },
    {
      id: "aunty-manjeet",
      name: "Chef Gurpreet Singh",
      region: "Punjab",
      specialty: "Punjabi",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400"
    },
    {
      id: "mala-di",
      name: "Chef Lakshmi Narayanan",
      region: "Kerala",
      specialty: "South Indian",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400"
    }
  ];

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
          <CookCard key={cook.id} cook={cook} />
        ))}
      </div>
    </section>
  );
};

export default TopRatedCooksSection;
