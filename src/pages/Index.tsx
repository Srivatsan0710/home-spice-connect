
import Header from "@/components/Header";
import CuisineCard from "@/components/CuisineCard";
import CookCard from "@/components/CookCard";
import DishCard from "@/components/DishCard";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cuisines, cooks, dishes } from "@/lib/data";

const festivalSpecials = [
  {
    name: "Diwali Special Thali",
    cook: "Aunty Manjeet",
    price: 450,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=400",
    story: "Traditional Diwali feast with sweets and savory delights",
    festival: "Diwali"
  },
  {
    name: "Christmas Plum Cake",
    cook: "Meena Amma",
    price: 350,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=400",
    story: "Homemade Christmas cake with traditional spices",
    festival: "Christmas"
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

        {/* Festival Specials */}
        <Section title="🎉 Festival Specials">
          <div className="flex space-x-4 overflow-x-auto p-4 -mt-2">
            {festivalSpecials.map((dish) => (
              <div key={dish.name} className="flex-shrink-0 w-72">
                <Card className="overflow-hidden rounded-2xl border-secondary shadow-sm">
                  <div className="relative">
                    <img src={dish.image} alt={dish.name} className="h-32 w-full object-cover" />
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                      {dish.festival}
                    </Badge>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-sm font-serif">{dish.name}</h3>
                    <p className="text-xs text-muted-foreground">by {dish.cook}</p>
                    <p className="text-sm font-bold text-primary mt-1">₹{dish.price}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </Section>
        
        <Section title="Explore Cuisines">
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
            {dishes.slice(0, 3).map((dish) => (
              <DishCard key={dish.name} dish={dish} />
            ))}
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
