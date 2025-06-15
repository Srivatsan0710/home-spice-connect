
import { Clock, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getBookingTimeSlots, formatBookingDeadline } from "@/utils/bookingUtils";

const MealScheduleBanner = () => {
  const bookingSlots = getBookingTimeSlots();
  const nextDeadline = bookingSlots.find(slot => slot.isBookable);

  return (
    <div className="p-4 pt-0">
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 border-amber-200 overflow-hidden">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-amber-600" />
            <span className="font-medium text-sm">Today's Meal Schedule</span>
          </div>
        </div>
        
        <div className="mt-2 flex space-x-3 overflow-x-auto pb-1">
          {bookingSlots.map((slot) => (
            <div key={slot.type} className="flex-shrink-0 flex items-center space-x-2">
              <Badge 
                variant={slot.isBookable ? "default" : "secondary"}
                className={`text-xs ${slot.isBookable 
                  ? 'bg-green-100 text-green-700 border-green-200' 
                  : 'bg-gray-100 text-gray-600 border-gray-200'
                }`}
              >
                <span className="capitalize">{slot.type}</span>
              </Badge>
              <div className="flex items-center space-x-1">
                {!slot.isBookable && <AlertCircle className="h-3 w-3 text-red-500" />}
                <span className="text-xs text-muted-foreground">
                  {formatBookingDeadline(slot.bookingDeadline)}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {nextDeadline && (
          <div className="mt-2 p-2 bg-amber-100 rounded-md">
            <p className="text-xs text-amber-800">
              ⏰ Next deadline: <span className="font-medium capitalize">{nextDeadline.type}</span> - 
              Book by {formatBookingDeadline(nextDeadline.bookingDeadline)}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MealScheduleBanner;
