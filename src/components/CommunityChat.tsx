
import { useState } from "react";
import { ArrowLeft, Send, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommunityChatProps {
  groupName: string;
  onBack: () => void;
}

const CommunityChat = ({ groupName, onBack }: CommunityChatProps) => {
  const [message, setMessage] = useState("");

  const chatMessages = [
    { user: "Priya M.", message: "Anyone tried the fish curry from Mala Di? It's amazing!", time: "2:30 PM", avatar: "P" },
    { user: "Rajesh K.", message: "Yes! Tastes just like my mom's. Highly recommend!", time: "2:32 PM", avatar: "R" },
    { user: "Meera S.", message: "Where can I find good Bengali sweets for Durga Puja?", time: "3:15 PM", avatar: "M" },
    { user: "Amit B.", message: "Try Aunty Sushma's mishti doi and rasgulla. She makes it fresh!", time: "3:18 PM", avatar: "A" }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-secondary/30">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b p-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="font-bold">{groupName}</h1>
            <p className="text-sm text-muted-foreground">1,245 members • 45 online</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((msg, index) => (
          <div key={index} className="flex space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">{msg.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-sm">{msg.user}</span>
                <span className="text-xs text-muted-foreground">{msg.time}</span>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm">{msg.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="sticky bottom-0 bg-white border-t p-4">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!message.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;
