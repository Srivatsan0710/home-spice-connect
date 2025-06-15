
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Clock, Calendar as CalendarIcon, AlertCircle } from "lucide-react";
import { getBookingTimeSlots, formatBookingDeadline, FestiveBooking } from "@/utils/bookingUtils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface BookingDialogProps {
  dishName: string;
  cookName: string;
  price: number;
  image: string;
  mealType?: 'breakfast' | 'lunch' | 'dinner';
  festiveBooking?: FestiveBooking;
  children: React.ReactNode;
}

const BookingDialog = ({ 
  dishName, 
  cookName, 
  price, 
  image, 
  mealType, 
  festiveBooking,
  children 
}: BookingDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const { toast } = useToast();
  const bookingSlots = getBookingTimeSlots();

  const handleBooking = (type: 'breakfast' | 'lunch' | 'dinner' | 'festive') => {
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

    const dateText = selectedDate ? selectedDate.toLocaleDateString() : 'today';
    toast({
      title: "Booking Confirmed!",
      description: `Your ${dishName} has been booked for ${dateText}`,
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
          <DialogTitle>Book Your Meal</DialogTitle>
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
                {selectedDate ? selectedDate.toLocaleDateString() : 'Select Date'}
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
              <p className="text-sm text-muted-foreground mb-3">
                Book by: {formatBookingDeadline(festiveBooking.bookByDate)}
              </p>
              <Button 
                onClick={() => handleBooking('festive')}
                disabled={!festiveBooking.isBookable}
                className="w-full"
              >
                {festiveBooking.isBookable ? 'Book Festive Special' : 'Booking Closed'}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="h-4 w-4 text-amber-600" />
                <span className="font-medium">Select Meal Time</span>
              </div>
              
              {bookingSlots.map((slot) => (
                <div key={slot.type} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium capitalize">{slot.type}</p>
                    <p className="text-xs text-muted-foreground">
                      Book by: {formatBookingDeadline(slot.bookingDeadline)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {slot.isBookable ? (
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        Available
                      </Badge>
                    ) : (
                      <div className="flex items-center space-x-1">
                        <AlertCircle className="h-3 w-3 text-red-500" />
                        <Badge variant="outline" className="text-red-600 border-red-200">
                          Closed
                        </Badge>
                      </div>
                    )}
                    <Button 
                      size="sm"
                      onClick={() => handleBooking(slot.type)}
                      disabled={!slot.isBookable}
                    >
                      Book
                    </Button>
                  </div>
                </div>
              ))}
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
