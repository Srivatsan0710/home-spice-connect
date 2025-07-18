export const cuisines = [
  { name: "Punjabi", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=300" },
  { name: "Bengali", image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=300" },
  { name: "South Indian", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?q=80&w=300" },
  { name: "Gujarati", image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?q=80&w=300" },
  { name: "Rajasthani", image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=300" },
];

export const cooks = [
  {
    id: "aunty-manjeet",
    name: "Aunty Manjeet",
    region: "Punjab",
    specialty: "Aloo Paratha",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=300",
    story: "For me, cooking is not just a daily chore, it's a way of sharing love and keeping my family's traditions alive. Every paratha I make is filled with the warmth of my Amritsari home.",
    video: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=400",
  },
  {
    id: "mala-di",
    name: "Mala Di",
    region: "Bengal",
    specialty: "Macher Jhol",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?q=80&w=300",
    story: "The rivers of Bengal flow in my veins, and their bounty inspires my cooking. My Macher Jhol is a recipe that has been passed down through generations, a taste of Sunday afternoons in Kolkata.",
    video: "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?q=80&w=400",
  },
  {
    id: "meena-amma",
    name: "Meena Amma",
    region: "Tamil Nadu",
    specialty: "Idli & Sambar",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=300",
    story: "Waking up to the smell of fresh idlis is a core memory from my childhood in Madurai. I use my grandmother's stone grinder to make the batter, and I believe that's my secret to the softest idlis.",
    video: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=400",
  },
];

export const dishes = [
  {
    name: "Sarson da Saag",
    cook: "Aunty Manjeet",
    price: 250,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1626520245059-54a2a1061b4d?q=80&w=400",
    story: "My grandmother's recipe, slow-cooked for 8 hours...",
    orders: 120,
    isBestVoted: false,
  },
  {
    name: "Aloo Paratha Special",
    cook: "Aunty Manjeet",
    price: 150,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1565554483789-a361092150a2?q=80&w=400",
    story: "The quintessential Punjabi breakfast, served with homemade butter.",
    orders: 95,
    isBestVoted: true,
  },
  {
    name: "Shorshe Ilish",
    cook: "Mala Di",
    price: 350,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1603894537424-9c4033b2167d?q=80&w=400",
    story: "A classic Bengali delicacy for special occasions.",
    orders: 90,
    isBestVoted: true,
  },
  {
    name: "Kosha Mangsho",
    cook: "Mala Di",
    price: 320,
    rating: 4.7,
    image: "https://plus.unsplash.com/premium_photo-1694699352125-5653c71a34a2?q=80&w=400",
    story: "Slow-cooked mutton curry, rich and flavorful.",
    orders: 150,
    isBestVoted: false,
  },
  {
    name: "Hyderabadi Biryani",
    cook: "Meena Amma",
    price: 300,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=400",
    story: "A royal dish passed down through generations.",
    orders: 200,
    isBestVoted: false,
  },
  {
    name: "Masala Dosa",
    cook: "Meena Amma",
    price: 180,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1668665780325-b06253455de3?q=80&w=400",
    story: "Crispy dosa with a spiced potato filling.",
    orders: 150,
    isBestVoted: true,
  },
];
