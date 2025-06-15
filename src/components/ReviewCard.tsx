
import { Star, ThumbsUp, MessageCircle, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface Review {
  id: string;
  userName?: string;
  customerName?: string;
  userAvatar?: string;
  rating: number;
  dishName: string;
  cookName?: string;
  reviewText?: string;
  comment?: string;
  images?: string[];
  date: string;
  likes?: number;
  isLiked?: boolean;
  isVerifiedPurchase?: boolean;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const [isLiked, setIsLiked] = useState(review.isLiked || false);
  const [likes, setLikes] = useState(review.likes || 0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "text-yellow-500 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const displayName = review.userName || review.customerName || "Anonymous";
  const displayText = review.reviewText || review.comment || "";
  const displayCook = review.cookName || "";

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar>
            <AvatarImage src={review.userAvatar} />
            <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-sage-800">{displayName}</span>
                  {review.isVerifiedPurchase && (
                    <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-200">
                      Verified Purchase
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-1 mt-1">
                  {renderStars(review.rating)}
                  <span className="text-sm text-sage-600 ml-2">{review.date}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="mb-3">
              <p className="text-sm text-sage-600 mb-1">
                <span className="font-medium text-amber-700">{review.dishName}</span>
                {displayCook && ` by ${displayCook}`}
              </p>
              <p className="text-sage-800">{displayText}</p>
            </div>

            {review.images && review.images.length > 0 && (
              <div className="flex space-x-2 mb-3">
                {review.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="w-16 h-16 rounded-lg object-cover cursor-pointer hover:opacity-80"
                  />
                ))}
              </div>
            )}

            <div className="flex items-center space-x-4 text-sm text-sage-600">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`flex items-center space-x-1 ${
                  isLiked ? "text-red-600" : "text-sage-600"
                }`}
              >
                <ThumbsUp className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                <span>{likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>Reply</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
