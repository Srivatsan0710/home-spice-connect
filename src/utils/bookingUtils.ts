
export interface BookingTimeSlot {
  type: 'breakfast' | 'lunch' | 'dinner';
  bookingDeadline: Date;
  isBookable: boolean;
  isPremium: boolean;
  premiumDeadline?: Date;
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

  // Tomorrow's breakfast: book before 6 PM today
  const breakfastDeadline = new Date(today);
  breakfastDeadline.setHours(18, 0, 0, 0); // 6 PM today
  const breakfastPremiumDeadline = new Date(breakfastDeadline);
  breakfastPremiumDeadline.setHours(20, 0, 0, 0); // 8 PM today (2 hours after)
  
  // Tomorrow's lunch: book before 6 PM today  
  const lunchDeadline = new Date(today);
  lunchDeadline.setHours(18, 0, 0, 0); // 6 PM today
  const lunchPremiumDeadline = new Date(lunchDeadline);
  lunchPremiumDeadline.setHours(20, 0, 0, 0); // 8 PM today (2 hours after)
  
  // Tomorrow's dinner: book before 12 PM tomorrow
  const dinnerDeadline = new Date(tomorrow);
  dinnerDeadline.setHours(12, 0, 0, 0); // 12 PM tomorrow
  const dinnerPremiumDeadline = new Date(dinnerDeadline);
  dinnerPremiumDeadline.setHours(14, 0, 0, 0); // 2 PM tomorrow (2 hours after)

  return [
    {
      type: 'breakfast',
      bookingDeadline: breakfastDeadline,
      isBookable: now < breakfastPremiumDeadline,
      isPremium: now > breakfastDeadline && now < breakfastPremiumDeadline,
      premiumDeadline: breakfastPremiumDeadline
    },
    {
      type: 'lunch',
      bookingDeadline: lunchDeadline,
      isBookable: now < lunchPremiumDeadline,
      isPremium: now > lunchDeadline && now < lunchPremiumDeadline,
      premiumDeadline: lunchPremiumDeadline
    },
    {
      type: 'dinner',
      bookingDeadline: dinnerDeadline,
      isBookable: now < dinnerPremiumDeadline,
      isPremium: now > dinnerDeadline && now < dinnerPremiumDeadline,
      premiumDeadline: dinnerPremiumDeadline
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
