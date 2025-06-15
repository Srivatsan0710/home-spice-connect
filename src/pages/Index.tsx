
import Header from "@/components/Header";
import CuisineCard from "@/components/CuisineCard";
import CookCard from "@/components/CookCard";
import DishCard from "@/components/DishCard";
import { cuisines, cooks, dishes } from "@/lib/data";

const Index = () => {
  return (
    <div className="flex flex-col min-h-full bg-secondary/30">
      <Header />
      <main className="flex-1 pb-4">
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
            {dishes.map((dish) => (
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
