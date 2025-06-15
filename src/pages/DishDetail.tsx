
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Clock, Users, Flame, Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { dishes } from "@/lib/data";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const DishDetail = () => {
  const { dishName } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const dish = dishes.find(d => d.name.toLowerCase().replace(/\s+/g, '-') === dishName);

  if (!dish) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Dish not found</h2>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        dishName: dish.name,
        cookName: dish.cook,
        price: dish.price,
        image: dish.image
      });
    }
    toast({
      title: "Added to cart!",
      description: `${quantity}x ${dish.name} added to your cart`,
    });
  };

  const spiceLevel = dish.name.includes('Sarson') ? 2 : dish.name.includes('Masala') ? 3 : 1;

  return (
    <div className="pb-16">
      <div className="relative">
        <img 
          src={dish.image} 
          alt={dish.name}
          className="w-full h-64 object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-white/80 hover:bg-white"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <h1 className="text-2xl font-bold font-serif">{dish.name}</h1>
          <p className="text-muted-foreground">by {dish.cook}</p>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="font-medium">{dish.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{dish.orders} orders</span>
            </div>
          </div>
        </div>

        {/* Story */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-2">Family Recipe Story</h3>
            <p className="text-sm text-muted-foreground">{dish.story}</p>
          </CardContent>
        </Card>

        {/* Details */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-3">Dish Details</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Prep Time</span>
                </div>
                <span className="text-sm font-medium">30-45 mins</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Flame className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Spice Level</span>
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3].map((level) => (
                    <Flame
                      key={level}
                      className={`h-3 w-3 ${
                        level <= spiceLevel ? 'text-red-500 fill-red-500' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ingredients */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-3">Main Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {dish.name.includes('Aloo') && <Badge variant="secondary">Potato</Badge>}
              {dish.name.includes('Sarson') && <Badge variant="secondary">Mustard Greens</Badge>}
              {dish.name.includes('Ilish') && <Badge variant="secondary">Hilsa Fish</Badge>}
              {dish.name.includes('Mangsho') && <Badge variant="secondary">Mutton</Badge>}
              {dish.name.includes('Biryani') && <Badge variant="secondary">Basmati Rice</Badge>}
              {dish.name.includes('Dosa') && <Badge variant="secondary">Rice & Lentils</Badge>}
              <Badge variant="secondary">Traditional Spices</Badge>
              <Badge variant="secondary">Fresh Herbs</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quantity and Add to Cart */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-2xl font-bold text-primary">₹{dish.price}</p>
                <p className="text-sm text-muted-foreground">per serving</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-bold text-lg min-w-[2rem] text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button className="w-full" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart - ₹{dish.price * quantity}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DishDetail;
