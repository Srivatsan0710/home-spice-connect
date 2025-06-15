
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Clock, Calendar as CalendarIcon, AlertCircle, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getBookingTimeSlots, formatBookingDeadline, FestiveBooking } from "@/utils/bookingUtils";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

interface BookingDialogProps {
  dishName: string;
  cookName: string;
  price: number;
  image: string;
  mealType?: 'breakfast' | 'lunch' | 'dinner';
  festiveBooking?: FestiveBooking;
  hasSubscription?: boolean;
  availableMeals?: string[];
  children: React.ReactNode;
}

const BookingDialog = ({ 
  dishName, 
  cookName, 
  price, 
  image, 
  mealType, 
  festiveBooking,
  hasSubscription = false,
  availableMeals = [],
  children 
}: BookingDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCart();
  const bookingSlots = getBookingTimeSlots();

  // Filter booking slots based on available meals
  const availableSlots = bookingSlots.filter(slot => {
    if (availableMeals.length === 0) return true;
    return availableMeals.some(meal => meal.toLowerCase() === slot.type);
  });

  const handleBooking = (type: 'breakfast' | 'lunch' | 'dinner' | 'festive', isPremium = false) => {
    if (type === 'festive' && festiveBooking) {
      if (!festiveBooking.isBookable) {
        toast({
          title: "Booking Closed",
          description: `Booking deadline has passed for ${dishName}`,
          variant: "destructive",
        });
        return;
      }
    } else {
      const slot = bookingSlots.find(s => s.type === type);
      if (!slot?.isBookable) {
        toast({
          title: "Booking Closed",
          description: `Booking deadline has passed for ${type}`,
          variant: "destructive",
        });
        return;
      }
    }

    const finalPrice = isPremium ? price * 1.2 : price; // 20% premium
    const priceLabel = isPremium ? ` (Premium: ₹${finalPrice})` : '';

    // Add to cart
    addToCart({
      dishName: `${dishName}${priceLabel}`,
      cookName,
      price: finalPrice,
      image
    });

    const dateText = selectedDate ? selectedDate.toLocaleDateString() : 'today';
    toast({
      title: "Added to Cart!",
      description: `${dishName} has been added to your cart for ${dateText}${isPremium ? ' with premium pricing' : ''}`,
    });
    setIsOpen(false);
  };

  const handleSubscription = (type: 'weekly' | 'monthly') => {
    // Add to cart for subscription
    addToCart({
      dishName: `${dishName} (${type} subscription)`,
      cookName,
      price: type === 'weekly' ? price * 7 : price * 30,
      image
    });

    toast({
      title: "Subscription Added to Cart!",
      description: `${type} subscription for ${dishName} has been added to your cart`,
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Book Your Meal</DialogTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <div className="space-y-2 text-xs">
                    <div><strong>Booking Deadlines:</strong></div>
                    <div>• Tomorrow's Breakfast & Lunch: Today 6:00 PM</div>
                    <div>• Tomorrow's Dinner: Tomorrow 12:00 PM</div>
                    <div className="pt-1 border-t">
                      <strong>Premium Pricing:</strong> Available for 2 hours after deadline with 20% extra charge
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <img src={image} alt={dishName} className="w-16 h-16 rounded-lg object-cover" />
            <div>
              <h3 className="font-semibold">{dishName}</h3>
              <p className="text-sm text-muted-foreground">by {cookName}</p>
              <p className="font-bold text-amber-700">₹{price}</p>
            </div>
          </div>

          {/* Date Selection */}
          <div className="border rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-4 w-4 text-amber-600" />
                <span className="font-medium">Select Date</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                {selectedDate ? selectedDate.toLocaleDateString() : 'Today'}
              </Button>
            </div>
            
            {showCalendar && (
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setShowCalendar(false);
                }}
                disabled={(date) => date < new Date() || date > new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
                className="rounded-md border"
              />
            )}
          </div>

          {festiveBooking ? (
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CalendarIcon className="h-4 w-4 text-amber-600" />
                <span className="font-medium">Festive Special</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Book by: {formatBookingDeadline(festiveBooking.bookByDate)}
              </p>
              <Button 
                onClick={() => handleBooking('festive')}
                disabled={!festiveBooking.isBookable}
                className="w-full"
              >
                {festiveBooking.isBookable ? 'Add to Cart' : 'Booking Closed'}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="h-4 w-4 text-amber-600" />
                <span className="font-medium">Select Meal Time</span>
              </div>
              
              {availableSlots.map((slot) => (
                <div key={slot.type} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium capitalize">{slot.type}</p>
                    <p className="text-xs text-muted-foreground">
                      Book by: {formatBookingDeadline(slot.bookingDeadline)}
                    </p>
                    {slot.isPremium && (
                      <p className="text-xs text-orange-600">
                        Premium pricing: ₹{Math.round(price * 1.2)} (+20%)
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {slot.isBookable ? (
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${slot.isPremium ? 'text-orange-600 border-orange-200' : 'text-green-600 border-green-200'}`}
                      >
                        {slot.isPremium ? 'Premium' : 'Available'}
                      </Badge>
                    ) : (
                      <div className="flex items-center space-x-1">
                        <AlertCircle className="h-3 w-3 text-red-500" />
                        <Badge variant="outline" className="text-red-600 border-red-200 text-xs">
                          Closed
                        </Badge>
                      </div>
                    )}
                    <Button 
                      size="sm"
                      onClick={() => handleBooking(slot.type, slot.isPremium)}
                      disabled={!slot.isBookable}
                      variant={slot.isPremium ? "outline" : "default"}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Subscription Options */}
          {hasSubscription && !festiveBooking && (
            <div className="border rounded-lg p-3">
              <h4 className="font-medium mb-2">Meal Subscriptions</h4>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleSubscription('weekly')}
                >
                  Weekly Subscription (₹{price * 7})
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleSubscription('monthly')}
                >
                  Monthly Subscription (₹{price * 30})
                </Button>
              </div>
            </div>
          )}

          {/* Quick Scheduling Options */}
          <div className="p-3 bg-secondary/20 rounded-lg">
            <h4 className="font-medium mb-2">Quick Schedule</h4>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date(Date.now() + 24 * 60 * 60 * 1000))}>
                Tomorrow
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))}>
                Next Week
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
