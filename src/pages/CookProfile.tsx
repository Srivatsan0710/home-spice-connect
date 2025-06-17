import Header from "@/components/Header";
import DishCard from "@/components/DishCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Verified, MapPin, Star, Utensils, ChefHat, Phone, Mail, Award, Clock, Shield, CheckCircle2, Calendar, Users, TrendingUp, Play, FileText, Camera } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { cooks } from "@/lib/data";

const CookProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cook = cooks.find((c) => c.id === id);

  if (!cook) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Chef not found</h1>
        <Button onClick={() => navigate('/')}>Go Back Home</Button>
      </div>
    );
  }

  // Enhanced chef data
  const chefDetails = {
    yearsOfExperience: 12,
    specialties: ["Punjabi", "North Indian", "Comfort Food"],
    availableDays: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday"],
    fssaiLicense: "12345678901234",
    repeatCustomers: 67,
    reorderRate: 85,
    videoIntroduction: "Monthly kitchen tour and cooking style intro",
    lastVideoUpdate: "December 2024"
  };

  // Hygiene checklist
  const hygieneChecklist = [
    { item: "Regular handwashing", checked: true, lastUpdated: "2 hours ago" },
    { item: "Clean kitchen space", checked: true, lastUpdated: "1 day ago" },
    { item: "Use of gloves and hairnets", checked: true, lastUpdated: "3 hours ago" },
    { item: "Proper food storage practices", checked: true, lastUpdated: "5 hours ago" }
  ];

  // Individual ratings
  const individualRatings = {
    hygienic: 4.9,
    tastesLikeHome: 4.8,
    onTimeDelivery: 4.7
  };

  // Extended dishes with booking info
  const cookDishes = [
    {
      name: "Signature Biryani",
      cook: cook?.name || "Chef",
      price: 320,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1563379091339-03246963d913?q=80&w=400",
      story: "Authentic Hyderabadi biryani with tender meat",
      orders: 156,
      isBestVoted: true,
      mealType: "dinner" as const,
      isHomeCook: cook?.name.includes('Chef')
    },
    {
      name: "Home Style Dal",
      cook: cook?.name || "Chef",
      price: 120,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=400",
      story: "Simple and nutritious dal tadka",
      orders: 89,
      isBestVoted: false,
      mealType: "lunch" as const,
      isHomeCook: true
    }
  ];

  // Customer reviews with food images
  const reviewsWithImages = [
    {
      id: "1",
      customerName: "Priya Sharma",
      rating: 5,
      comment: "The Sarson da Saag was absolutely delicious! Tasted just like my grandmother's cooking.",
      date: "2 days ago",
      dishName: "Sarson da Saag",
      foodImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=300",
      avatar: "PS"
    },
    {
      id: "2", 
      customerName: "Rajesh Kumar",
      rating: 5,
      comment: "Authentic Punjabi flavors. The butter chicken was perfectly spiced and creamy.",
      date: "5 days ago",
      dishName: "Butter Chicken",
      foodImage: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=300",
      avatar: "RK"
    },
    {
      id: "3",
      customerName: "Anita Gupta", 
      rating: 4,
      comment: "Good food, delivered on time. The makki di roti was fresh and warm.",
      date: "1 week ago",
      dishName: "Makki di Roti",
      foodImage: "https://images.unsplash.com/photo-1626132647346-f4d2f2d0a5f0?q=80&w=300",
      avatar: "AG"
    }
  ];

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-full bg-secondary/30">
        {/* Header */}
        <Header />

        <main className="flex-1 pb-4">
          {/* Chef Info */}
          <section className="p-4">
            <Card className="p-4">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={cook.image} alt={cook.name} />
                  <AvatarFallback>{cook.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold font-serif">{cook.name}</h1>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Verified className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Verified Chef</span>
                    {chefDetails.fssaiLicense && (
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        <FileText className="h-3 w-3 mr-1" />
                        FSSAI Licensed
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{cook.region || 'Local Area'}</span>
                  </div>
                </div>
              </div>

              {/* Years of Experience */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">{chefDetails.yearsOfExperience} Years of Experience</span>
                </div>
              </div>

              {/* Chef's Specialties */}
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Chef's Food Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {chefDetails.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="bg-orange-100 text-orange-700">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Available Days */}
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2 flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Available Days</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {chefDetails.availableDays.map((day) => (
                    <Badge key={day} variant="outline" className="text-xs">
                      {day}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Video Introduction */}
              <div className="mb-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Play className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Chef Introduction Video</span>
                    </div>
                    <p className="text-xs text-blue-700">{chefDetails.videoIntroduction}</p>
                    <p className="text-xs text-blue-600 mt-1">Last updated: {chefDetails.lastVideoUpdate}</p>
                    <Button size="sm" variant="outline" className="mt-2 text-blue-600 border-blue-300">
                      <Camera className="h-3 w-3 mr-1" />
                      Watch Kitchen Tour
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Individual Ratings */}
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-3">Detailed Ratings</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Shield className="h-3 w-3 text-green-600" />
                      <span className="text-lg font-bold text-green-600">{individualRatings.hygienic}</span>
                    </div>
                    <p className="text-xs text-gray-600">Hygienic</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <ChefHat className="h-3 w-3 text-orange-600" />
                      <span className="text-lg font-bold text-orange-600">{individualRatings.tastesLikeHome}</span>
                    </div>
                    <p className="text-xs text-gray-600">Tastes Like Home</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Clock className="h-3 w-3 text-blue-600" />
                      <span className="text-lg font-bold text-blue-600">{individualRatings.onTimeDelivery}</span>
                    </div>
                    <p className="text-xs text-gray-600">On-time Delivery</p>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">{chefDetails.repeatCustomers}+ repeat customers</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">{chefDetails.reorderRate}% reorder rate</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm">
                    {cook.rating}
                    <span className="text-muted-foreground"> (150+ reviews)</span>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Utensils className="h-4 w-4" />
                  <span className="text-sm">{cook.specialty || 'Multi'} Cuisine</span>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-muted-foreground">{cook.story || 'Passionate chef bringing authentic flavors to your table.'}</p>
              </div>

              <div className="mt-4 flex space-x-2">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </div>
            </Card>
          </section>

          {/* Hygiene Self-Assessment */}
          <section className="mt-6 px-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>Hygiene Self-Assessment</span>
                  <Badge variant="secondary" className="text-xs">Updated Frequently</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {hygieneChecklist.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{item.item}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{item.lastUpdated}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Chef's Dishes */}
          <section className="mt-6">
            <h2 className="text-xl font-bold font-serif px-4 mb-4">Available Dishes</h2>
            <div className="grid grid-cols-1 gap-4 px-4">
              {cookDishes.map((dish) => (
                <DishCard key={dish.name} dish={dish} />
              ))}
            </div>
          </section>

          {/* Reviews with Food Images */}
          <section className="mt-6">
            <h2 className="text-xl font-bold font-serif px-4 mb-4">Customer Reviews</h2>
            <div className="space-y-4 px-4">
              {reviewsWithImages.map((review) => (
                <Card key={review.id} className="p-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>{review.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">{review.customerName}</p>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-yellow-400 mb-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {review.comment}
                      </p>
                      <div className="flex items-center space-x-3">
                        <img 
                          src={review.foodImage} 
                          alt={review.dishName}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium">{review.dishName}</p>
                          <p className="text-xs text-muted-foreground">Customer's photo</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Trust Guarantee Tooltip */}
          <div className="px-4 mt-6">
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="bg-green-50 border-green-200 p-4 cursor-pointer">
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Trust & Safety Guarantee</span>
                  </div>
                </Card>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-3">
                <p className="text-sm">
                  This chef offers a 100% refund in case of hygiene complaints or late delivery beyond 1 hour.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default CookProfile;
