
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Star, Clock, User, Heart, Share2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { dishes } from "@/lib/data";
import BookingDialog from "@/components/BookingDialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

// Extended dish data with nutritional information
const extendedDishes = [
  ...dishes.map((dish, index) => ({
    ...dish,
    isHomeCook: dish.cook.includes('Aunty') || dish.cook.includes('Amma'),
    mealType: 'lunch' as const,
    ingredients: [
      "Chicken", "Tomatoes", "Onions", "Garlic", "Ginger", "Spices", "Cream", "Butter"
    ],
    nutrients: {
      calories: 450,
      protein: 35,
      fat: 28,
      carbs: 15,
      fiber: 3,
      sodium: 890
    }
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
    isHomeCook: true,
    ingredients: [
      "Kidney beans", "Onions", "Tomatoes", "Ginger-garlic paste", "Cumin", "Coriander", "Red chili powder", "Garam masala"
    ],
    nutrients: {
      calories: 320,
      protein: 18,
      fat: 8,
      carbs: 45,
      fiber: 12,
      sodium: 650
    }
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
    isHomeCook: true,
    ingredients: [
      "Rice", "Urad dal", "Fenugreek seeds", "Salt", "Sambar", "Coconut chutney"
    ],
    nutrients: {
      calories: 280,
      protein: 12,
      fat: 4,
      carbs: 52,
      fiber: 6,
      sodium: 420
    }
  },
  // Add recommended dishes
  {
    name: "Ghar Jaisa Rajma",
    cook: "Aunty Priya",
    price: 140,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=400",
    story: "Just like home-made rajma chawal",
    orders: 234,
    isBestVoted: false,
    mealType: "lunch" as const,
    isHomeCook: true,
    ingredients: [
      "Kidney beans", "Onions", "Tomatoes", "Ginger-garlic paste", "Cumin", "Coriander", "Red chili powder", "Garam masala"
    ],
    nutrients: {
      calories: 340,
      protein: 20,
      fat: 10,
      carbs: 48,
      fiber: 14,
      sodium: 680
    }
  },
  {
    name: "South Indian Breakfast",
    cook: "Meera Amma",
    price: 110,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?q=80&w=400",
    story: "Traditional idli with sambar and chutney",
    orders: 189,
    isBestVoted: true,
    mealType: "breakfast" as const,
    isHomeCook: true,
    ingredients: [
      "Rice", "Urad dal", "Fenugreek seeds", "Salt", "Sambar", "Coconut chutney"
    ],
    nutrients: {
      calories: 280,
      protein: 12,
      fat: 4,
      carbs: 52,
      fiber: 6,
      sodium: 420
    }
  },
  // Add Festival Specials
  {
    name: "Diwali Special Thali",
    cook: "Aunty Manjeet",
    price: 450,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=400",
    story: "Traditional Diwali feast with sweets and savory delights",
    orders: 234,
    isBestVoted: false,
    mealType: "dinner" as const,
    isHomeCook: true,
    ingredients: [
      "Paneer", "Rice", "Dal", "Roti", "Sweets", "Pickles", "Yogurt", "Vegetables"
    ],
    nutrients: {
      calories: 850,
      protein: 25,
      fat: 35,
      carbs: 120,
      fiber: 15,
      sodium: 1200
    }
  },
  {
    name: "Christmas Plum Cake",
    cook: "Meena Amma",
    price: 350,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=400",
    story: "Homemade Christmas cake with traditional spices",
    orders: 189,
    isBestVoted: true,
    mealType: "dinner" as const,
    isHomeCook: true,
    ingredients: [
      "Flour", "Eggs", "Butter", "Dried fruits", "Rum", "Spices", "Sugar", "Nuts"
    ],
    nutrients: {
      calories: 420,
      protein: 8,
      fat: 18,
      carbs: 65,
      fiber: 4,
      sodium: 280
    }
  }
];

const DishDetail = () => {
  const { dishName } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isOverlay = searchParams.get('overlay') === 'true';

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

  const handleCookClick = () => {
    // Create cook ID from cook name for navigation
    let cookId = '';
    
    // Map cook names to their actual IDs from the data
    if (dish.cook === 'Aunty Manjeet') {
      cookId = 'aunty-manjeet';
    } else if (dish.cook === 'Mala Di') {
      cookId = 'mala-di';
    } else if (dish.cook === 'Meena Amma' || dish.cook === 'Meera Amma') {
      cookId = 'meena-amma';
    } else if (dish.cook === 'Aunty Kumar') {
      cookId = 'aunty-manjeet'; // fallback to existing cook
    } else if (dish.cook === 'Aunty Priya') {
      cookId = 'aunty-manjeet'; // fallback to existing cook
    } else {
      // Fallback: create ID from name
      cookId = dish.cook.toLowerCase().replace(/\s+/g, '-');
    }
    
    // Close overlay first if it's open
    if (isOverlay) {
      navigate(`/cook/${cookId}`);
    } else {
      navigate(`/cook/${cookId}`);
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  const DishContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
        >
          {isOverlay ? <X className="h-4 w-4 mr-2" /> : <ArrowLeft className="h-4 w-4 mr-2" />}
          {isOverlay ? 'Close' : 'Back'}
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

      <div className="flex-1 overflow-y-auto pb-20">
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
        </div>

        {/* Dish Info */}
        <div className="p-4">
          <Card className="p-4">
            <h1 className="text-2xl font-bold font-serif mb-2">{dish.name}</h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <button 
                onClick={handleCookClick}
                className="flex items-center space-x-1 hover:text-primary transition-colors"
              >
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground underline">by {dish.cook}</span>
              </button>
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
              <BookingDialog
                dishName={dish.name}
                cookName={dish.cook}
                price={dish.price}
                image={dish.image}
                mealType={dish.mealType}
                hasSubscription={dish.isHomeCook}
              >
                <Button size="lg">Add to Cart</Button>
              </BookingDialog>
            </div>
          </Card>
        </div>

        {/* Ingredients */}
        <div className="p-4">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-3">Ingredients</h2>
            <div className="flex flex-wrap gap-2">
              {dish.ingredients.map((ingredient, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {ingredient}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Nutritional Information */}
        <div className="p-4">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-3">Nutritional Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-secondary/20 rounded-lg">
                <p className="text-2xl font-bold text-primary">{dish.nutrients.calories}</p>
                <p className="text-sm text-muted-foreground">Calories</p>
              </div>
              <div className="text-center p-3 bg-secondary/20 rounded-lg">
                <p className="text-2xl font-bold text-primary">{dish.nutrients.protein}g</p>
                <p className="text-sm text-muted-foreground">Protein</p>
              </div>
              <div className="text-center p-3 bg-secondary/20 rounded-lg">
                <p className="text-2xl font-bold text-primary">{dish.nutrients.fat}g</p>
                <p className="text-sm text-muted-foreground">Fat</p>
              </div>
              <div className="text-center p-3 bg-secondary/20 rounded-lg">
                <p className="text-2xl font-bold text-primary">{dish.nutrients.carbs}g</p>
                <p className="text-sm text-muted-foreground">Carbs</p>
              </div>
              <div className="text-center p-3 bg-secondary/20 rounded-lg">
                <p className="text-2xl font-bold text-primary">{dish.nutrients.fiber}g</p>
                <p className="text-sm text-muted-foreground">Fiber</p>
              </div>
              <div className="text-center p-3 bg-secondary/20 rounded-lg">
                <p className="text-2xl font-bold text-primary">{dish.nutrients.sodium}mg</p>
                <p className="text-sm text-muted-foreground">Sodium</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Cook Info */}
        <div className="p-4">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-2">About the Cook</h2>
            <button 
              onClick={handleCookClick}
              className="flex items-center space-x-3 w-full text-left hover:bg-secondary/20 p-2 rounded-lg transition-colors"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">{dish.cook}</p>
                <p className="text-sm text-muted-foreground">
                  4.8 rating
                </p>
              </div>
            </button>
          </Card>
        </div>
      </div>
    </div>
  );

  if (isOverlay) {
    return (
      <Drawer open={true} onOpenChange={(open) => !open && handleClose()}>
        <DrawerContent className="h-[80vh] max-h-[80vh] sm:h-[60vh] sm:max-h-[60vh]">
          <DishContent />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-secondary/30">
      <DishContent />
    </div>
  );
};

export default DishDetail;
