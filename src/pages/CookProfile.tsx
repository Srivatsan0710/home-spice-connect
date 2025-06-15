
import { useParams, Link } from "react-router-dom";
import { cooks, dishes } from "@/lib/data";
import { ArrowLeft, Star, Video } from "lucide-react";
import DishCard from "@/components/DishCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import HighlightCard from "@/components/HighlightCard";

const CookProfile = () => {
  const { id } = useParams<{ id: string }>();
  const cook = cooks.find((c) => c.id === id);
  const cookDishes = dishes.filter((d) => d.cook === cook?.name);

  const mostOrderedDish = cookDishes.length > 0 ? [...cookDishes].sort((a, b) => (b.orders || 0) - (a.orders || 0))[0] : null;
  const bestVotedDish = cookDishes.find(d => d.isBestVoted);

  if (!cook) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <h1 className="text-2xl font-bold font-serif mb-2">Cook not found</h1>
        <p className="text-muted-foreground mb-4">We couldn't find the cook you're looking for.</p>
        <Link to="/">
          <Button>Go back home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-16">
      <div className="relative">
        <img src={cook.image} alt={cook.name} className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <Link to="/" className="absolute top-4 left-4 z-10">
          <Button variant="ghost" size="icon" className="bg-white/80 rounded-full h-10 w-10 backdrop-blur-sm hover:bg-white">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </Button>
        </Link>
        <div className="absolute bottom-0 p-4 text-white">
          <h1 className="text-3xl font-bold font-serif">{cook.name}</h1>
          <p className="text-md opacity-90">{cook.region} | Speciality: {cook.specialty}</p>
        </div>
      </div>
      
      <div className="p-4 space-y-6">
        <Card className="p-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span className="ml-2 text-lg font-bold">{cook.rating}</span>
              <span className="ml-2 text-muted-foreground text-sm">(50+ ratings)</span>
            </div>
        </Card>

        {cook.video && (
          <section>
            <h2 className="text-lg font-bold font-serif mb-2">A Glimpse into their Kitchen</h2>
            <div className="relative rounded-2xl overflow-hidden aspect-video group cursor-pointer">
              <img src={cook.video} alt={`${cook.name} video thumbnail`} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Button variant="ghost" size="icon" className="bg-white/80 rounded-full h-16 w-16 backdrop-blur-sm hover:bg-white transition-transform group-hover:scale-110">
                  <Video className="h-8 w-8 text-primary" />
                </Button>
              </div>
            </div>
          </section>
        )}

        {(mostOrderedDish || bestVotedDish) && (
          <section>
            <h2 className="text-lg font-bold font-serif mb-2">Highlights</h2>
            <div className="grid grid-cols-2 gap-4">
              {mostOrderedDish && (
                <HighlightCard
                  dish={mostOrderedDish}
                  label="Most Ordered"
                  icon={<span>📈</span>}
                />
              )}
              {bestVotedDish && (
                <HighlightCard
                  dish={bestVotedDish}
                  label="Top Rated"
                  icon={<span>👑</span>}
                />
              )}
            </div>
          </section>
        )}

        <Card className="p-4">
          <h2 className="text-lg font-bold font-serif mb-2">Cook's Story</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">{cook.story}</p>
        </Card>

        <section>
          <h2 className="text-xl font-bold font-serif mb-4">Dishes by {cook.name}</h2>
          <div className="grid grid-cols-1 gap-4">
            {cookDishes.length > 0 ? (
              cookDishes.map((dish) => (
                <DishCard key={dish.name} dish={dish} />
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">This cook hasn't added any dishes yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CookProfile;
