
import { useState } from "react";
import { Star, Heart, MessageSquare, Share, ThumbsUp, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Review {
  id: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  date: string;
  dishName: string;
  helpful: number;
  images?: string[];
}

interface SocialFeaturesProps {
  dishName: string;
  cookName: string;
  reviews: Review[];
  onAddReview?: (review: { rating: number; comment: string }) => void;
}

const mockReviews: Review[] = [
  {
    id: "1",
    userName: "Priya S.",
    rating: 5,
    comment: "Absolutely delicious! Tastes just like my grandmother's cooking. The spices were perfectly balanced.",
    date: "2 days ago",
    dishName: "Aloo Paratha",
    helpful: 12
  },
  {
    id: "2",
    userName: "Rajesh K.",
    rating: 4,
    comment: "Good taste but could use a bit more salt. Overall satisfied with the order.",
    date: "1 week ago",
    dishName: "Aloo Paratha",
    helpful: 8
  }
];

const SocialFeatures = ({ dishName, cookName, reviews = mockReviews, onAddReview }: SocialFeaturesProps) => {
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [likedReviews, setLikedReviews] = useState<string[]>([]);

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const handleSubmitReview = () => {
    if (newRating > 0 && newComment.trim()) {
      onAddReview?.({ rating: newRating, comment: newComment.trim() });
      setNewRating(0);
      setNewComment("");
      setShowReviewForm(false);
    }
  };

  const toggleLike = (reviewId: string) => {
    setLikedReviews(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const StarRating = ({ rating, interactive = false, onChange }: { 
    rating: number; 
    interactive?: boolean; 
    onChange?: (rating: number) => void;
  }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating 
              ? "text-yellow-400 fill-yellow-400" 
              : "text-gray-300"
          } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
          onClick={() => interactive && onChange?.(star)}
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Ratings Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Reviews & Ratings</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowReviewForm(true)}
            >
              Write Review
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{averageRating.toFixed(1)}</div>
              <StarRating rating={Math.round(averageRating)} />
              <div className="text-sm text-muted-foreground">{reviews.length} reviews</div>
            </div>
            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviews.filter(r => r.rating === rating).length;
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={rating} className="flex items-center space-x-2 text-sm">
                    <span>{rating}</span>
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-muted-foreground">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review Form */}
      {showReviewForm && (
        <Card>
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Rating</label>
                <StarRating 
                  rating={newRating} 
                  interactive 
                  onChange={setNewRating}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Your Review</label>
                <Textarea
                  placeholder="Share your experience with this dish..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleSubmitReview} disabled={!newRating || !newComment.trim()}>
                  Submit Review
                </Button>
                <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-3">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={review.userImage} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{review.userName}</h4>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <StarRating rating={review.rating} />
                    <Badge variant="outline" className="text-xs">
                      {review.dishName}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{review.comment}</p>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1"
                      onClick={() => toggleLike(review.id)}
                    >
                      <ThumbsUp 
                        className={`h-4 w-4 mr-1 ${
                          likedReviews.includes(review.id) 
                            ? "text-blue-600 fill-blue-600" 
                            : "text-muted-foreground"
                        }`} 
                      />
                      <span className="text-xs">
                        Helpful ({review.helpful + (likedReviews.includes(review.id) ? 1 : 0)})
                      </span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-auto p-1">
                      <MessageSquare className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-xs">Reply</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-auto p-1">
                      <Share className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-xs">Share</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SocialFeatures;
