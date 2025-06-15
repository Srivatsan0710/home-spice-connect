
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, ChefHat } from "lucide-react";
import { getBookingTimeSlots, formatBookingDeadline } from "@/utils/bookingUtils";

const SchedulingOptions = () => {
  const bookingSlots = getBookingTimeSlots();

  return (
    <section className="mt-6">
      <div className="px-4 mb-3">
        <h2 className="text-lg font-bold font-serif">Today's Meal Schedule</h2>
        <p className="text-xs text-muted-foreground">Book your meals with home cooks</p>
      </div>
      
      <div className="px-4">
        <Card className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-center space-x-2 mb-2">
            <ChefHat className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-800">Booking Deadlines</span>
          </div>
          
          <div className="space-y-2">
            {bookingSlots.map((slot) => (
              <div key={slot.type} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-3 w-3 text-amber-600" />
                  <div>
                    <p className="text-xs font-medium capitalize text-amber-800">{slot.type}</p>
                    <p className="text-xs text-amber-600">
                      Book by: {formatBookingDeadline(slot.bookingDeadline)}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant={slot.isBookable ? "default" : "outline"} 
                  className={`text-xs h-5 ${slot.isBookable ? "bg-green-500" : "text-red-600 border-red-200"}`}
                >
                  {slot.isBookable ? "Open" : "Closed"}
                </Badge>
              </div>
            ))}
          </div>
          
          <div className="mt-3 pt-2 border-t border-amber-200">
            <div className="flex items-center space-x-2 text-amber-700">
              <Calendar className="h-3 w-3" />
              <span className="text-xs">Plan ahead for tomorrow's meals!</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default SchedulingOptions;
