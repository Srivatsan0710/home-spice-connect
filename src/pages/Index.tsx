
import Header from "@/components/Header";
import CuisineCard from "@/components/CuisineCard";
import CookCard from "@/components/CookCard";
import DishCard from "@/components/DishCard";
import PersonalizedRecommendations from "@/components/PersonalizedRecommendations";
import SchedulingOptions from "@/components/SchedulingOptions";
import BookingDialog from "@/components/BookingDialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cuisines, cooks, dishes } from "@/lib/data";
import { getFestiveBookingInfo, formatBookingDeadline } from "@/utils/bookingUtils";

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
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=400",
    story: "Homemade Christmas cake with traditional spices",
    festival: "Christmas",
    bookByDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  }
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-full bg-secondary/30">
      <Header />
      <main className="flex-1 pb-4">
        {/* Regional Welcome Banner */}
        <div className="p-4">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/20 p-4 border-primary/20">
            <h2 className="font-bold text-lg font-serif">Welcome back, Rajesh! 🏠</h2>
            <p className="text-sm text-muted-foreground">
              Cooks from Karnataka are preparing your favorite dishes
            </p>
          </Card>
        </div>

        {/* Scheduling Options */}
        <SchedulingOptions />

        {/* Personalized Recommendations */}
        <PersonalizedRecommendations />

        {/* Festival Specials */}
        <Section title="🎉 Festival Specials">
          <div className="flex space-x-4 overflow-x-auto p-4 -mt-2">
            {festivalSpecials.map((dish) => {
              const festiveBooking = getFestiveBookingInfo(dish.bookByDate);
              return (
                <div key={dish.name} className="flex-shrink-0 w-72">
                  <Card className="overflow-hidden rounded-2xl border-secondary shadow-sm">
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
                          festiveBooking={festiveBooking}
                        >
                          <Button size="sm" disabled={!festiveBooking.isBookable}>
                            {festiveBooking.isBookable ? 'Book Now' : 'Booking Closed'}
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
        
        <Section title="Featured Cooks from your Region">
          <div className="flex space-x-4 overflow-x-auto p-4 -mt-2">
            {cooks.map((cook) => (
              <CookCard key={cook.name} cook={cook} />
            ))}
          </div>
        </Section>
        
        <Section title="Today's Specials">
          <div className="grid grid-cols-1 gap-4 p-4">
            {dishes.slice(0, 3).map((dish) => {
              // Convert regular dishes to have booking properties for home cooks
              const dishWithBooking = {
                ...dish,
                isHomeCook: dish.cook.includes('Aunty') || dish.cook.includes('Amma'),
                mealType: 'lunch' as const,
                availableMeals: ["Lunch", "Dinner"],
                hasSubscription: true
              };
              return <DishCard key={dish.name} dish={dishWithBooking} />;
            })}
          </div>
        </Section>

        {/* Homesickness Alert */}
        <div className="p-4">
          <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 border-orange-200">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🏠</span>
              <div>
                <h3 className="font-bold text-sm">Missing home food?</h3>
                <p className="text-xs text-muted-foreground">
                  Try Aunty Manjeet's authentic Punjabi dishes - just like home!
                </p>
              </div>
            </div>
          </Card>
        </div>
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
