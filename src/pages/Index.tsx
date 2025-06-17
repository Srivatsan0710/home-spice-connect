
import Header from "@/components/Header";
import CuisineCard from "@/components/CuisineCard";
import CookCard from "@/components/CookCard";
import DishCard from "@/components/DishCard";
import PersonalizedRecommendations from "@/components/PersonalizedRecommendations";
import ComfortFoodRecommendation from "@/components/ComfortFoodRecommendation";
import TopRatedCooksSection from "@/components/TopRatedCooksSection";
import BookingDialog from "@/components/BookingDialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cuisines, cooks, dishes } from "@/lib/data";
import { getFestiveBookingInfo, formatBookingDeadline } from "@/utils/bookingUtils";
import { useNavigate } from "react-router-dom";

const festivalSpecials = [
  {
    name: "Diwali Special Thali",
    cook: "Aunty Manjeet",
    price: 450,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=400",
    story: "Traditional Diwali feast with sweets and savory delights",
    festival: "Diwali",
    bookByDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
  },
  {
    name: "Christmas Plum Cake",
    cook: "Meena Amma",
    price: 350,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1576618148400-fb8a883dc6d8?q=80&w=400",
    story: "Homemade Christmas cake with traditional spices",
    festival: "Christmas",
    bookByDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  }
];

// Enhanced dishes with better images for Today's Specials
const todaysSpecials = [
  {
    ...dishes[0],
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=400", // Butter chicken
    availableMeals: ["Lunch", "Dinner"]
  },
  {
    ...dishes[1],
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=400", // Fish curry
    availableMeals: ["Lunch", "Dinner"]
  },
  {
    ...dishes[2],
    image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?q=80&w=400", // Rice dish
    availableMeals: ["Breakfast", "Lunch", "Dinner"]
  }
];

const Index = () => {
  const navigate = useNavigate();

  const handleDishClick = (dishName: string) => {
    const dishSlug = dishName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/dish/${dishSlug}?overlay=true`);
  };

  return (
    <div className="flex flex-col min-h-full bg-secondary/30">
      <Header />
      <main className="flex-1 pb-4">
        {/* Regional Welcome Banner */}
        <div className="p-4">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/20 p-4 border-primary/20">
            <h2 className="font-bold text-lg font-serif">Welcome back, Sachin! 🏠</h2>
            <p className="text-sm text-muted-foreground">
              Taste the love of home with every meal from our trusted local chefs who cook just like family.
            </p>
          </Card>
        </div>

        {/* Personalized Recommendations */}
        <PersonalizedRecommendations />

        {/* AI-Powered Comfort Food Recommendation */}
        <ComfortFoodRecommendation />

        {/* Festival Specials */}
        <Section title="🎉 Festival Specials">
          <div className="flex space-x-4 overflow-x-auto p-4 -mt-2">
            {festivalSpecials.map((dish) => {
              const festiveBooking = getFestiveBookingInfo(dish.bookByDate);
              return (
                <div key={dish.name} className="flex-shrink-0 w-72">
                  <Card 
                    className="overflow-hidden rounded-2xl border-secondary shadow-sm cursor-pointer transition-shadow hover:shadow-lg"
                    onClick={() => handleDishClick(dish.name)}
                  >
                    <div className="relative">
                      <img src={dish.image} alt={dish.name} className="h-32 w-full object-cover" />
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                        {dish.festival}
                      </Badge>
                      <Badge className="absolute top-2 right-2 bg-amber-600 text-white text-xs">
                        Book by: {formatBookingDeadline(dish.bookByDate)}
                      </Badge>
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-sm font-serif">{dish.name}</h3>
                      <p className="text-xs text-muted-foreground">by {dish.cook}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-sm font-bold text-primary">₹{dish.price}</p>
                        <BookingDialog
                          dishName={dish.name}
                          cookName={dish.cook}
                          price={dish.price}
                          image={dish.image}
                          mealType="dinner"
                          hasSubscription={true}
                        >
                          <Button 
                            size="sm" 
                            onClick={(e) => e.stopPropagation()}
                            className="h-8 px-3"
                          >
                            Add
                          </Button>
                        </BookingDialog>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </Section>
        
        <Section title="Explore Regional Cuisines">
          <div className="flex space-x-4 overflow-x-auto p-4 -mt-2">
            {cuisines.map((cuisine) => (
              <CuisineCard key={cuisine.name} cuisine={cuisine} />
            ))}
          </div>
        </Section>
        
        {/* Top Rated Chefs for User */}
        <TopRatedCooksSection />
        
        <Section title="Featured Chefs from your Region">
          <div className="flex space-x-4 overflow-x-auto p-4 -mt-2">
            {cooks.map((cook) => (
              <CookCard key={cook.name} cook={cook} />
            ))}
          </div>
        </Section>
        
        <Section title="Today's Specials">
          <div className="grid grid-cols-1 gap-4 p-4">
            {todaysSpecials.map((dish) => (
              <DishCard key={dish.name} dish={dish} />
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mt-6">
    <h2 className="text-xl font-bold font-serif px-4">{title}</h2>
    {children}
  </section>
);

export default Index;
