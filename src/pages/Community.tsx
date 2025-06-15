
import { useState } from "react";
import { Search, Users, MessageSquare, Camera, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Community = () => {
  const [activeTab, setActiveTab] = useState("groups");

  const regionalGroups = [
    { name: "Bengalis in Bangalore", members: 1245, image: "🐟", description: "Traditional Bengali recipes and cultural connections" },
    { name: "Punjabis in Chennai", members: 892, image: "🌾", description: "Authentic Punjabi food lovers unite!" },
    { name: "South Indians in Delhi", members: 2156, image: "🥥", description: "Missing home food? We've got you covered!" },
    { name: "Gujaratis in Mumbai", members: 1678, image: "🫓", description: "Gujarati thali and snacks community" }
  ];

  const recipeRequests = [
    { user: "Priya M.", request: "Looking for authentic Kolkata-style fish curry recipe", responses: 12, time: "2h ago" },
    { user: "Rajesh K.", request: "Anyone know how to make perfect Lucknowi biryani?", responses: 8, time: "5h ago" },
    { user: "Meera S.", request: "Need recipe for Kerala-style appam and stew", responses: 15, time: "1d ago" }
  ];

  const photoShares = [
    { user: "Anjali D.", dish: "Ghar Jaisa Rajma Chawal", cook: "Aunty Priya", rating: 5, image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=200" },
    { user: "Suresh P.", dish: "Fish Curry & Rice", cook: "Mala Di", rating: 5, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=200" },
    { user: "Kavya R.", dish: "Masala Dosa", cook: "Meena Amma", rating: 4, image: "https://images.unsplash.com/photo-1668665780325-b06253455de3?q=80&w=200" }
  ];

  return (
    <div className="flex flex-col min-h-full bg-secondary/30">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold">Community</h1>
              <p className="text-sm text-muted-foreground">Connect with food lovers from your region</p>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search groups, recipes, discussions..." className="pl-10" />
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="festivals">Festivals</TabsTrigger>
          </TabsList>

          <TabsContent value="groups" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {regionalGroups.map((group, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{group.image}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{group.name}</h3>
                        <p className="text-sm text-muted-foreground">{group.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{group.members} members</span>
                        </div>
                      </div>
                      <Button size="sm">Join</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recipe Requests
                  <Button size="sm">Post Request</Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recipeRequests.map((request, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{request.user[0]}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm">{request.user}</span>
                          <span className="text-xs text-muted-foreground">{request.time}</span>
                        </div>
                        <p className="text-sm mb-2">{request.request}</p>
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{request.responses} responses</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Help</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="photos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Meal Photos & Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {photoShares.map((photo, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-start space-x-3">
                      <img src={photo.image} alt={photo.dish} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm">{photo.user}</span>
                          <span className="text-xs text-muted-foreground">shared a photo</span>
                        </div>
                        <h4 className="font-semibold text-sm">{photo.dish}</h4>
                        <p className="text-xs text-muted-foreground">by {photo.cook}</p>
                        <div className="flex items-center space-x-1 mt-2">
                          {[...Array(photo.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <Button variant="ghost" size="sm">
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="festivals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Festival Celebrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-l-orange-400">
                    <h3 className="font-semibold text-orange-800">Diwali Special Menu</h3>
                    <p className="text-sm text-orange-700">Traditional sweets and savory dishes available now!</p>
                    <Badge className="mt-2 bg-orange-100 text-orange-800">Ongoing</Badge>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-l-green-400">
                    <h3 className="font-semibold text-green-800">Christmas Feast</h3>
                    <p className="text-sm text-green-700">Pre-order your Christmas cakes and special meals</p>
                    <Badge className="mt-2 bg-green-100 text-green-800">Coming Soon</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;
