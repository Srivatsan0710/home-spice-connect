import { useState } from "react";
import { Search, Users, MessageSquare, ArrowRight, Calendar, MapPin, TrendingUp, Star, Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommunityChat from "@/components/CommunityChat";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const [activeTab, setActiveTab] = useState("groups");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const navigate = useNavigate();

  const regionalGroups = [
    { 
      name: "Bengalis in Bangalore", 
      members: 1245, 
      image: "🐟", 
      description: "Traditional Bengali recipes and cultural connections",
      isJoined: false,
      onlineMembers: 45
    },
    { 
      name: "Punjabis in Chennai", 
      members: 892, 
      image: "🌾", 
      description: "Authentic Punjabi food lovers unite!",
      isJoined: true,
      onlineMembers: 32
    },
    { 
      name: "South Indians in Delhi", 
      members: 2156, 
      image: "🥥", 
      description: "Missing home food? We've got you covered!",
      isJoined: false,
      onlineMembers: 78
    },
    { 
      name: "Gujaratis in Mumbai", 
      members: 1678, 
      image: "🫓", 
      description: "Gujarati thali and snacks community",
      isJoined: true,
      onlineMembers: 56
    }
  ];

  const localCelebrations = [
    {
      title: "Onam Feast Potluck",
      organizer: "Keralites in Bangalore",
      location: "Koramangala Community Hall",
      date: "Sep 15, 2024",
      attendees: 45,
      description: "Traditional Onam Sadhya with 13 courses. Bring your favorite Kerala dish!"
    },
    {
      title: "Durga Puja Community Cooking",
      organizer: "Bengali Community Chennai",
      location: "T. Nagar Community Center",
      date: "Oct 12, 2024",
      attendees: 67,
      description: "Join us for authentic Bengali bhog preparation and distribution"
    },
    {
      title: "Karva Chauth Special Menu",
      organizer: "North Indian Wives Group",
      location: "Gurgaon Resident Club",
      date: "Nov 1, 2024",
      attendees: 32,
      description: "Traditional sargi and evening feast preparation together"
    }
  ];

  const investmentOpportunities = [
    {
      cookName: "Aunty Manjeet",
      project: "Traditional Tandoor Installation",
      description: "Help me install a clay tandoor to make authentic naan and tandoori dishes",
      targetAmount: 45000,
      raisedAmount: 32000,
      investors: 24,
      expectedReturns: "15% discount + exclusive tandoori menu access",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=300",
      status: "active"
    },
    {
      cookName: "Meena Amma",
      project: "South Indian Spice Grinding Setup",
      description: "Upgrade to commercial wet grinder for fresh idli/dosa batter and spice powders",
      targetAmount: 25000,
      raisedAmount: 25000,
      investors: 18,
      expectedReturns: "20% discount + monthly spice packets",
      image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=300",
      status: "completed"
    },
    {
      cookName: "Mala Di",
      project: "Fresh Fish Cold Storage",
      description: "Install professional refrigeration for daily fresh fish supply",
      targetAmount: 35000,
      raisedAmount: 8500,
      investors: 7,
      expectedReturns: "12% discount + priority fish curry orders",
      image: "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?q=80&w=300",
      status: "active"
    }
  ];

  const advisoryBoards = [
    {
      cookName: "Aunty Manjeet",
      members: 12,
      nextMeeting: "Oct 25, 2024",
      currentDiscussion: "Winter menu planning - Should we add more soup varieties?",
      status: "open"
    },
    {
      cookName: "Meena Amma",
      members: 8,
      nextMeeting: "Nov 2, 2024",
      currentDiscussion: "Festival special pricing strategy for Diwali sweets",
      status: "full"
    }
  ];

  const handleJoinGroup = (groupName: string) => {
    console.log(`Joining group: ${groupName}`);
  };

  const handleGroupClick = (groupName: string, isJoined: boolean) => {
    if (isJoined) {
      setSelectedGroup(groupName);
    }
  };

  const handleFestivalOrder = () => {
    navigate('/discover?filter=festive');
  };

  if (selectedGroup) {
    return (
      <CommunityChat 
        groupName={selectedGroup} 
        onBack={() => setSelectedGroup(null)} 
      />
    );
  }

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
            <Input placeholder="Search groups, celebrations..." className="pl-10" />
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="celebrations">Celebrations</TabsTrigger>
            <TabsTrigger value="investments">Partnerships</TabsTrigger>
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
                          <span className="text-xs text-green-600">• {group.onlineMembers} online</span>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        {group.isJoined ? (
                          <>
                            <Badge className="bg-green-100 text-green-800">Joined</Badge>
                            <Button 
                              size="sm" 
                              onClick={() => handleGroupClick(group.name, group.isJoined)}
                              className="flex items-center space-x-1"
                            >
                              <MessageSquare className="h-3 w-3" />
                              <span>Chat</span>
                            </Button>
                          </>
                        ) : (
                          <Button size="sm" onClick={() => handleJoinGroup(group.name)}>
                            Join
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="celebrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Local Celebrations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {localCelebrations.map((celebration, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold">{celebration.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{celebration.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>by {celebration.organizer}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{celebration.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{celebration.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Badge variant="outline">{celebration.attendees} going</Badge>
                        <Button size="sm" variant="outline">Join</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Festival Celebration Orders Section */}
            <Card>
              <CardHeader>
                <CardTitle>Festival Menu Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-l-orange-400">
                    <h3 className="font-semibold text-orange-800">Diwali Special Menu</h3>
                    <p className="text-sm text-orange-700">Traditional sweets and savory dishes available now!</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge className="bg-orange-100 text-orange-800">Ongoing</Badge>
                      <Button size="sm" variant="outline" onClick={handleFestivalOrder}>
                        Order for Festival <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-l-green-400">
                    <h3 className="font-semibold text-green-800">Christmas Feast</h3>
                    <p className="text-sm text-green-700">Pre-order your Christmas cakes and special meals</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge className="bg-green-100 text-green-800">Coming Soon</Badge>
                      <Button size="sm" variant="outline" onClick={handleFestivalOrder}>
                        Order for Festival <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investments" className="space-y-4">
            {/* Cook Investment Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>Cook Investment Opportunities</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {investmentOpportunities.map((opportunity, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start space-x-3 mb-3">
                      <img src={opportunity.image} alt={opportunity.cookName} className="w-12 h-12 rounded-full object-cover" />
                      <div className="flex-1">
                        <h4 className="font-semibold">{opportunity.project}</h4>
                        <p className="text-sm text-muted-foreground">by {opportunity.cookName}</p>
                        <p className="text-sm text-gray-700 mt-1">{opportunity.description}</p>
                      </div>
                      <Badge className={opportunity.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                        {opportunity.status === 'completed' ? 'Funded' : 'Active'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span>₹{opportunity.raisedAmount.toLocaleString()} raised</span>
                        <span>₹{opportunity.targetAmount.toLocaleString()} goal</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(opportunity.raisedAmount / opportunity.targetAmount) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{opportunity.investors} investors</span>
                        <span>{Math.round((opportunity.raisedAmount / opportunity.targetAmount) * 100)}% funded</span>
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 p-3 rounded-lg mb-3">
                      <p className="text-sm font-medium text-amber-800">Returns: {opportunity.expectedReturns}</p>
                    </div>
                    
                    {opportunity.status === 'active' && (
                      <Button size="sm" className="w-full">
                        Invest Now
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Community Advisory Boards */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Cook Advisory Councils</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {advisoryBoards.map((board, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{board.cookName}'s Advisory Council</h4>
                      <Badge className={board.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {board.status === 'open' ? 'Open' : 'Full'}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3">{board.currentDiscussion}</p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span>{board.members} members</span>
                      <span>Next meeting: {board.nextMeeting}</span>
                    </div>
                    
                    {board.status === 'open' && (
                      <Button size="sm" variant="outline" className="w-full">
                        Join Council
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;
