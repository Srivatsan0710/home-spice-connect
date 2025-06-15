
import { useState } from "react";
import { Bell, X, Clock, Star, Heart, Gift } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  type: "order" | "promotion" | "review" | "favorite";
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionUrl?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "Order Update",
    message: "Your order from Aunty Manjeet is being prepared",
    time: "2 mins ago",
    read: false
  },
  {
    id: "2",
    type: "promotion",
    title: "Special Offer",
    message: "20% off on all South Indian dishes today!",
    time: "1 hour ago",
    read: false
  },
  {
    id: "3",
    type: "review",
    title: "Rate Your Order",
    message: "How was your Masala Dosa from Meena Amma?",
    time: "2 hours ago",
    read: true
  },
  {
    id: "4",
    type: "favorite",
    title: "New Dish Alert",
    message: "Your favorite cook has added a new dish!",
    time: "1 day ago",
    read: true
  }
];

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [showAll, setShowAll] = useState(false);

  const getIcon = (type: string) => {
    switch (type) {
      case "order": return Clock;
      case "promotion": return Gift;
      case "review": return Star;
      case "favorite": return Heart;
      default: return Bell;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const displayNotifications = showAll ? notifications : notifications.slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less" : "View All"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          <div className="space-y-3">
            {displayNotifications.map((notification) => {
              const Icon = getIcon(notification.type);
              return (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border cursor-pointer hover:bg-gray-50 ${
                    !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${
                      notification.type === 'order' ? 'bg-blue-100 text-blue-600' :
                      notification.type === 'promotion' ? 'bg-green-100 text-green-600' :
                      notification.type === 'review' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;
