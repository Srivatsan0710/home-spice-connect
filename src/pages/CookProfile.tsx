import Header from "@/components/Header";
import DishCard from "@/components/DishCard";
import CookCard from "@/components/CookCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Verified, MapPin, Star, Utensils, ChefHat, Phone, Mail } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { cooks } from "@/lib/data";

const CookProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const cook = cooks.find((c) => c.id === id);

  if (!cook) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Cook not found</h1>
        <Button onClick={() => navigate('/')}>Go Back Home</Button>
      </div>
    );
  }

  // Extended dishes with booking info
  const cookDishes = [
    {
      name: "Signature Biryani",
      cook: cook?.name || "Chef",
      price: 320,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1563379091339-03246963d913?q=80&w=400",
      story: "Authentic Hyderabadi biryani with tender meat",
      orders: 156,
      isBestVoted: true,
      mealType: "dinner" as const,
      isHomeCook: cook?.name.includes('Aunty') || cook?.name.includes('Amma')
    },
    {
      name: "Home Style Dal",
      cook: cook?.name || "Chef",
      price: 120,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=400",
      story: "Simple and nutritious dal tadka",
      orders: 89,
      isBestVoted: false,
      mealType: "lunch" as const,
      isHomeCook: true
    }
  ];

  return (
    <div className="flex flex-col min-h-full bg-secondary/30">
      {/* Header */}
      <Header />

      <main className="flex-1 pb-4">
        {/* Cook Info */}
        <section className="p-4">
          <Card className="p-4">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={cook.image} alt={cook.name} />
                <AvatarFallback>{cook.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold font-serif">{cook.name}</h1>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Verified className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Verified Cook</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{cook.location}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm">
                  {cook.rating}
                  <span className="text-muted-foreground"> ({cook.reviews} reviews)</span>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Utensils className="h-4 w-4" />
                <span className="text-sm">{cook.cuisine} Cuisine</span>
              </div>
              <div className="flex items-center space-x-2">
                <ChefHat className="h-4 w-4" />
                <span className="text-sm">{cook.type}</span>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-muted-foreground">{cook.bio}</p>
            </div>

            <div className="mt-4 flex space-x-2">
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
          </Card>
        </section>

        {/* Cook's Dishes */}
        <section className="mt-6">
          <h2 className="text-xl font-bold font-serif px-4 mb-4">Available Dishes</h2>
          <div className="grid grid-cols-1 gap-4 px-4">
            {cookDishes.map((dish) => (
              <DishCard key={dish.name} dish={dish} />
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-6">
          <h2 className="text-xl font-bold font-serif px-4 mb-4">Reviews</h2>
          <div className="space-y-4 px-4">
            <Card className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>RS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Rajesh Sharma</p>
                  <div className="flex items-center space-x-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The biryani was absolutely delicious! Best I've had in Bangalore.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>PK</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Priya Kumar</p>
                  <div className="flex items-center space-x-1 text-yellow-400">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The dal tadka was just like my mom used to make. So comforting.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CookProfile;
