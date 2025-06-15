
import { ArrowLeft, Star, Heart, Plus, Minus, Clock, Users, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import CookRating from "@/components/CookRating";
import ReviewCard from "@/components/ReviewCard";

const mockDishData = {
  "sarson-da-saag": {
    name: "Sarson da Saag",
    cook: "Aunty Manjeet",
    cookId: "aunty-manjeet",
    price: 180,
    rating: 4.9,
    totalReviews: 127,
    image: "https://images.unsplash.com/photo-1626520245059-54a2a1061b4d?q=80&w=400",
    story: "Traditional Punjabi winter delicacy made with fresh mustard greens, slow-cooked for 6 hours with authentic spices. This recipe has been passed down through three generations in my family.",
    orders: 145,
    prepTime: "45 mins",
    serves: "2-3 people",
    ingredients: ["Fresh Mustard Greens", "Spinach", "Bathua", "Ginger-Garlic", "Green Chilies", "Onions", "Tomatoes", "Traditional Spices"],
    nutritionInfo: {
      calories: 320,
      protein: "12g",
      carbs: "24g",
      fat: "18g"
    },
    tags: ["Vegetarian", "Healthy", "Traditional", "Winter Special"],
    availability: "Available Today",
    cookingMethod: "Slow-cooked in traditional clay pot for authentic flavor",
    reviews: [
      {
        id: "1",
        customerName: "Priya Sharma",
        rating: 5,
        comment: "The Sarson da Saag was absolutely delicious! Tasted just like my grandmother's cooking. The authentic clay pot cooking really makes a difference.",
        date: "2 days ago",
        dishName: "Sarson da Saag",
      },
      {
        id: "2",
        customerName: "Rajesh Kumar",
        rating: 5,
        comment: "Perfect balance of flavors. You can taste the love and tradition in every bite. Highly recommended!",
        date: "5 days ago",
        dishName: "Sarson da Saag",
      },
    ]
  }
};

const DishDetail = () => {
  const { dishName } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const dish = mockDishData[dishName as keyof typeof mockDishData];

  if (!dish) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Dish not found</p>
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

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: `${dish.name} ${isFavorite ? 'removed from' : 'added to'} your favorites`,
    });
  };

  return (
    <div className="pb-32">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleFavorite}>
            <Heart className={`h-6 w-6 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
          </Button>
        </div>
      </header>

      {/* Dish Image */}
      <div className="relative">
        <img src={dish.image} alt={dish.name} className="w-full h-64 object-cover" />
        <div className="absolute bottom-4 left-4 right-4">
          <Badge className="bg-emerald-600 text-white mb-2">
            {dish.availability}
          </Badge>
        </div>
      </div>

      {/* Dish Info */}
      <div className="p-4">
        <Card className="mb-4">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold font-serif text-amber-800 mb-2">{dish.name}</h1>
                <p className="text-sage-600 mb-2 cursor-pointer" onClick={() => navigate(`/cook/${dish.cookId}/profile`)}>
                  by {dish.cook}
                </p>
                <CookRating rating={dish.rating} totalReviews={dish.totalReviews} />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-amber-700">₹{dish.price}</p>
                <p className="text-sm text-muted-foreground">per serving</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {dish.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-sage-100 text-sage-700">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <Clock className="h-5 w-5 text-amber-600 mx-auto mb-1" />
                <p className="text-sm font-medium">{dish.prepTime}</p>
                <p className="text-xs text-muted-foreground">Prep Time</p>
              </div>
              <div className="text-center">
                <Users className="h-5 w-5 text-amber-600 mx-auto mb-1" />
                <p className="text-sm font-medium">{dish.serves}</p>
                <p className="text-xs text-muted-foreground">Serves</p>
              </div>
              <div className="text-center">
                <Award className="h-5 w-5 text-amber-600 mx-auto mb-1" />
                <p className="text-sm font-medium">{dish.orders}</p>
                <p className="text-xs text-muted-foreground">Orders</p>
              </div>
            </div>

            <p className="text-sage-700 leading-relaxed">{dish.story}</p>
          </CardContent>
        </Card>

        {/* Ingredients */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg text-amber-800">Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {dish.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-sm text-sage-700">{ingredient}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nutrition Info */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg text-amber-800">Nutrition Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-amber-700">{dish.nutritionInfo.calories}</p>
                <p className="text-xs text-muted-foreground">Calories</p>
              </div>
              <div>
                <p className="text-lg font-bold text-amber-700">{dish.nutritionInfo.protein}</p>
                <p className="text-xs text-muted-foreground">Protein</p>
              </div>
              <div>
                <p className="text-lg font-bold text-amber-700">{dish.nutritionInfo.carbs}</p>
                <p className="text-xs text-muted-foreground">Carbs</p>
              </div>
              <div>
                <p className="text-lg font-bold text-amber-700">{dish.nutritionInfo.fat}</p>
                <p className="text-xs text-muted-foreground">Fat</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cooking Method */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg text-amber-800">Cooking Method</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sage-700">{dish.cookingMethod}</p>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg text-amber-800">Customer Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dish.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fixed Bottom Add to Cart */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm p-4 border-t max-w-[450px] mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-lg font-medium px-4">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-amber-700">₹{dish.price * quantity}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
        </div>
        <Button onClick={handleAddToCart} className="w-full bg-amber-600 hover:bg-amber-700 text-white">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default DishDetail;
