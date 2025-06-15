
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Clock, User, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { dishes } from "@/lib/data";
import BookingDialog from "@/components/BookingDialog";
import { getFestiveBookingInfo, formatBookingDeadline } from "@/utils/bookingUtils";

// Extended dish data with booking info
const extendedDishes = [
  ...dishes.map(dish => ({
    ...dish,
    isHomeCook: dish.cook.includes('Aunty') || dish.cook.includes('Amma'),
    mealType: 'lunch' as const
  })),
  {
    name: "Homestyle Rajma",
    cook: "Aunty Kumar",
    price: 150,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=400",
    story: "Traditional kidney beans curry made with love and authentic spices, just like home",
    orders: 189,
    isBestVoted: false,
    mealType: "lunch" as const,
    isHomeCook: true
  },
  {
    name: "Fresh Morning Idli",
    cook: "Meera Amma",
    price: 120,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?q=80&w=400",
    story: "Soft, fluffy idlis served with aromatic sambar and coconut chutney",
    orders: 156,
    isBestVoted: false,
    mealType: "breakfast" as const,
    isHomeCook: true
  }
];

const DishDetail = () => {
  const { dishName } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const dish = extendedDishes.find(
    d => d.name.toLowerCase().replace(/\s+/g, '-') === dishName
  );

  if (!dish) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Dish not found</h1>
        <Button onClick={() => navigate('/')}>Go Back Home</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      dishName: dish.name,
      cookName: dish.cook,
      price: dish.price,
      image: dish.image
    });
    toast({
      title: "Added to cart!",
      description: `${dish.name} added to your cart`,
    });
  };

  // Check if it's a festive dish (for demo purposes)
  const isFestive = dish.name.toLowerCase().includes('special') || dish.name.toLowerCase().includes('festive');
  const festiveBooking = isFestive ? getFestiveBookingInfo(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)) : undefined;

  return (
    <div className="flex flex-col min-h-full bg-secondary/30">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <main className="flex-1 pb-20">
        {/* Dish Image */}
        <div className="relative">
          <img 
            src={dish.image} 
            alt={dish.name}
            className="w-full h-64 object-cover"
          />
          {dish.isBestVoted && (
            <Badge className="absolute top-4 left-4 bg-yellow-500 text-yellow-900">
              Top Rated
            </Badge>
          )}
          {dish.isHomeCook && (
            <Badge className="absolute top-4 right-4 bg-green-500 text-white">
              Home Cook
            </Badge>
          )}
          {isFestive && festiveBooking && (
            <Badge className="absolute bottom-4 left-4 bg-amber-600 text-white">
              Book by: {formatBookingDeadline(festiveBooking.bookByDate)}
            </Badge>
          )}
        </div>

        {/* Dish Info */}
        <div className="p-4">
          <Card className="p-4">
            <h1 className="text-2xl font-bold font-serif mb-2">{dish.name}</h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">by {dish.cook}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium">{dish.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{dish.orders} orders</span>
              </div>
            </div>

            <p className="text-muted-foreground mb-4">{dish.story}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">₹{dish.price}</span>
              {dish.isHomeCook ? (
                <BookingDialog
                  dishName={dish.name}
                  cookName={dish.cook}
                  price={dish.price}
                  image={dish.image}
                  mealType={dish.mealType}
                  festiveBooking={festiveBooking}
                >
                  <Button size="lg">
                    {isFestive ? 
                      (festiveBooking?.isBookable ? 'Book Festive Special' : 'Booking Closed') :
                      'Book Now'
                    }
                  </Button>
                </BookingDialog>
              ) : (
                <Button size="lg" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* Cook Info */}
        <div className="p-4">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-2">About the Cook</h2>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">{dish.cook}</p>
                <p className="text-sm text-muted-foreground">
                  {dish.isHomeCook ? 'Home Cook' : 'Professional Chef'} • 4.8 rating
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DishDetail;
