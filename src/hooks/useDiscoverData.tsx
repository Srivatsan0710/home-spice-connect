
import { dishes, cooks } from "@/lib/data";

const festiveSpecials = [
  {
    name: "Diwali Special Thali",
    cook: "Aunty Manjeet",
    price: 450,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=400",
    story: "Traditional Diwali feast with sweets and savory delights",
    orders: 234,
    isBestVoted: false,
    festival: "Diwali"
  },
  {
    name: "Christmas Plum Cake",
    cook: "Meena Amma",
    price: 350,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=400",
    story: "Homemade Christmas cake with traditional spices",
    orders: 189,
    isBestVoted: true,
    festival: "Christmas"
  }
];

const regionalCuisines = {
  "South Indian": [
    {
      name: "Coconut Rice",
      cook: "Meera Amma",
      price: 130,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?q=80&w=400",
      story: "Fragrant coconut rice with curry leaves",
      orders: 145,
      isBestVoted: false
    }
  ],
  "Bengali": [
    {
      name: "Fish Curry",
      cook: "Dida",
      price: 180,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=400",
      story: "Traditional Bengali fish curry with rice",
      orders: 167,
      isBestVoted: true
    }
  ],
  "Punjabi": [
    {
      name: "Butter Chicken",
      cook: "Aunty Kumar",
      price: 220,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=400",
      story: "Rich and creamy butter chicken",
      orders: 289,
      isBestVoted: true
    }
  ]
};

export const useDiscoverData = (filterType: string, regionFilter: string) => {
  const getFilteredData = () => {
    switch (filterType) {
      case "Festive Specials":
        return festiveSpecials;
      case "Cooks":
        return cooks;
      case "Dishes":
      default:
        if (regionFilter && regionalCuisines[regionFilter as keyof typeof regionalCuisines]) {
          return regionalCuisines[regionFilter as keyof typeof regionalCuisines];
        }
        return dishes;
    }
  };

  return { getFilteredData };
};
