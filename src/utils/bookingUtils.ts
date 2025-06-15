
export interface BookingTimeSlot {
  type: 'breakfast' | 'lunch' | 'dinner';
  bookingDeadline: Date;
  isBookable: boolean;
}

export interface FestiveBooking {
  bookByDate: Date;
  isBookable: boolean;
}

export const getBookingTimeSlots = (): BookingTimeSlot[] => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Breakfast for next day: book before 6 PM today
  const breakfastDeadline = new Date(today);
  breakfastDeadline.setHours(18, 0, 0, 0); // 6 PM today for tomorrow's breakfast
  
  // Lunch: book before 7 AM same day
  const lunchDeadline = new Date(today);
  lunchDeadline.setHours(7, 0, 0, 0); // 7 AM today for today's lunch
  
  // Dinner: book before 12 PM same day
  const dinnerDeadline = new Date(today);
  dinnerDeadline.setHours(12, 0, 0, 0); // 12 PM today for today's dinner

  return [
    {
      type: 'breakfast',
      bookingDeadline: breakfastDeadline,
      isBookable: now < breakfastDeadline
    },
    {
      type: 'lunch',
      bookingDeadline: lunchDeadline,
      isBookable: now < lunchDeadline
    },
    {
      type: 'dinner',
      bookingDeadline: dinnerDeadline,
      isBookable: now < dinnerDeadline
    }
  ];
};

export const getFestiveBookingInfo = (bookByDate: Date): FestiveBooking => {
  const now = new Date();
  return {
    bookByDate,
    isBookable: now < bookByDate
  };
};

export const formatBookingDeadline = (date: Date): string => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const deadline = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  if (deadline.getTime() === today.getTime()) {
    return `${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
  } else if (deadline.getTime() === today.getTime() + 86400000) {
    return `Tomorrow ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
  } else {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
};
