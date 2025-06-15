
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BulkScheduler = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedMealType, setSelectedMealType] = useState("");
  const [selectedDish, setSelectedDish] = useState("");

  const dishes = [
    "Rajma Chawal", "Butter Chicken", "Fish Curry", "Masala Dosa", 
    "Biryani", "Dal Tadka", "Paneer Makhani", "Chole Bhature"
  ];

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDates(prev => {
      const isSelected = prev.some(d => d.toDateString() === date.toDateString());
      if (isSelected) {
        return prev.filter(d => d.toDateString() !== date.toDateString());
      } else {
        return [...prev, date];
      }
    });
  };

  const handleBulkSchedule = () => {
    if (selectedDates.length > 0 && selectedMealType && selectedDish) {
      // Handle bulk scheduling logic
      console.log("Scheduling:", { selectedDates, selectedMealType, selectedDish });
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Bulk Schedule Meals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Calendar for date selection */}
          <div>
            <h3 className="font-medium mb-2">Select Dates</h3>
            <Calendar
              mode="multiple"
              selected={selectedDates}
              onSelect={(dates) => setSelectedDates(dates || [])}
              className="rounded-md border"
              disabled={(date) => date < new Date()}
            />
          </div>

          {/* Meal type selection */}
          <div>
            <h3 className="font-medium mb-2">Meal Type</h3>
            <Select value={selectedMealType} onValueChange={setSelectedMealType}>
              <SelectTrigger>
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dish selection */}
          <div>
            <h3 className="font-medium mb-2">Select Dish</h3>
            <Select value={selectedDish} onValueChange={setSelectedDish}>
              <SelectTrigger>
                <SelectValue placeholder="Select dish" />
              </SelectTrigger>
              <SelectContent>
                {dishes.map((dish) => (
                  <SelectItem key={dish} value={dish}>{dish}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected dates display */}
          {selectedDates.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Selected Dates ({selectedDates.length})</h3>
              <div className="flex flex-wrap gap-2">
                {selectedDates.map((date, index) => (
                  <Badge key={index} variant="secondary">
                    {date.toLocaleDateString()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Button 
            onClick={handleBulkSchedule}
            disabled={!selectedDates.length || !selectedMealType || !selectedDish}
            className="w-full"
          >
            Schedule {selectedDates.length} Meals
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkScheduler;
