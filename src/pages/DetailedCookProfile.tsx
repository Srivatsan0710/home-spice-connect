import { ArrowLeft, MapPin, Phone, MessageCircle, Heart, Star, Clock, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DishCard from "@/components/DishCard";
import CookRating from "@/components/CookRating";
import ReviewCard from "@/components/ReviewCard";

const mockCookData = {
  "aunty-manjeet": {
    name: "Aunty Manjeet",
    location: "Koramangala, Bangalore",
    specialties: ["Punjabi", "North Indian"],
    experience: "15+ years",
    rating: 4.8,
    totalReviews: 342,
    totalOrders: 1250,
    followers: 89,
    isFollowing: false,
    bio: "Cooking authentic Punjabi food for over 15 years. My recipes are passed down from my grandmother, and I take pride in using fresh ingredients and traditional methods.",
    phone: "+91 98765 43210",
    availableHours: "10:00 AM - 8:00 PM",
    dishes: [
      {
        name: "Sarson da Saag",
        price: 180,
        rating: 4.9,
        image: "/placeholder.svg",
        story: "Traditional Punjabi winter delicacy made with fresh mustard greens",
        orders: 145,
        isBestVoted: true,
      },
      {
        name: "Makki di Roti",
        price: 40,
        rating: 4.7,
        image: "/placeholder.svg",
        story: "Handmade corn flour bread, perfect companion to Sarson da Saag",
        orders: 98,
        isBestVoted: false,
      },
      {
        name: "Butter Chicken",
        price: 280,
        rating: 4.8,
        image: "/placeholder.svg",
        story: "Creamy and rich butter chicken with aromatic spices",
        orders: 201,
        isBestVoted: true,
      },
    ],
    reviews: [
      {
        id: "1",
        customerName: "Priya Sharma",
        rating: 5,
        comment: "The Sarson da Saag was absolutely delicious! Tasted just like my grandmother's cooking. Will definitely order again.",
        date: "2 days ago",
        dishName: "Sarson da Saag",
      },
      {
        id: "2",
        customerName: "Rajesh Kumar",
        rating: 5,
        comment: "Authentic Punjabi flavors. The butter chicken was perfectly spiced and creamy. Highly recommended!",
        date: "5 days ago",
        dishName: "Butter Chicken",
      },
      {
        id: "3",
        customerName: "Anita Gupta",
        rating: 4,
        comment: "Good food, delivered on time. The makki di roti was fresh and warm.",
        date: "1 week ago",
        dishName: "Makki di Roti",
      },
    ],
  },
};

const DetailedCookProfile = () => {
  const { cookId } = useParams();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<"dishes" | "reviews" | "about">("dishes");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cook = mockCookData[cookId as keyof typeof mockCookData];

  if (!cook) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Cook not found</p>
      </div>
    );
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="pb-16">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 p-4 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Heart className={`h-6 w-6 ${isFollowing ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>
      </header>

      {/* Cook Profile Header */}
      <div className="p-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-primary">
                  {cook.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold font-serif text-primary mb-1">{cook.name}</h1>
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{cook.location}</span>
                </div>
                <CookRating rating={cook.rating} totalReviews={cook.totalReviews} />
                <div className="flex items-center space-x-4 mt-2">
                  <div className="text-center">
                    <div className="font-bold text-primary">{cook.totalOrders}</div>
                    <div className="text-xs text-muted-foreground">Orders</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-primary">{cook.followers}</div>
                    <div className="text-xs text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-primary">{cook.experience}</div>
                    <div className="text-xs text-muted-foreground">Experience</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4 mb-4">
              {cook.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary">
                  {specialty}
                </Badge>
              ))}
            </div>

            <div className="flex space-x-2">
              <Button 
                onClick={handleFollow}
                variant={isFollowing ? "outline" : "default"}
                className="flex-1"
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button variant="outline" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="px-4 mb-4">
        <div className="grid grid-cols-3 gap-3">
          <Card className="text-center">
            <CardContent className="p-3">
              <Award className="h-6 w-6 text-primary mx-auto mb-1" />
              <div className="text-lg font-bold text-primary">{cook.rating}</div>
              <div className="text-xs text-muted-foreground">Rating</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-3">
              <Clock className="h-6 w-6 text-primary mx-auto mb-1" />
              <div className="text-xs font-medium">Available</div>
              <div className="text-xs text-muted-foreground">{cook.availableHours}</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-3">
              <Star className="h-6 w-6 text-primary mx-auto mb-1" />
              <div className="text-lg font-bold text-primary">{cook.dishes.length}</div>
              <div className="text-xs text-muted-foreground">Dishes</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-4 mb-4">
        <div className="flex space-x-1 bg-secondary/20 rounded-lg p-1">
          {["dishes", "reviews", "about"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-background text-primary shadow-sm"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4">
        {activeTab === "dishes" && (
          <div className="space-y-3">
            {cook.dishes.map((dish, index) => (
              <DishCard key={index} dish={{ ...dish, cook: cook.name }} />
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            {cook.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

        {activeTab === "about" && (
          <Card>
            <CardHeader>
              <CardTitle>About {cook.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{cook.bio}</p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm">{cook.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm">Available: {cook.availableHours}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm">{cook.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DetailedCookProfile;
