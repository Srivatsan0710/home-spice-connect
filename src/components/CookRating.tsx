
import { Star } from "lucide-react";

interface CookRatingProps {
  rating: number;
  totalReviews: number;
  size?: "sm" | "md" | "lg";
}

const CookRating = ({ rating, totalReviews, size = "md" }: CookRatingProps) => {
  const starSize = size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4";
  const textSize = size === "sm" ? "text-xs" : size === "lg" ? "text-lg" : "text-sm";

  return (
    <div className="flex items-center space-x-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className={`${textSize} font-medium`}>{rating.toFixed(1)}</span>
      <span className={`${textSize} text-muted-foreground`}>
        ({totalReviews} reviews)
      </span>
    </div>
  );
};

export default CookRating;
