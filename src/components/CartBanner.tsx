
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

const CartBanner = () => {
  const { getTotalItems, getTotalPrice } = useCart();
  const navigate = useNavigate();

  if (getTotalItems() === 0) {
    return null;
  }

  const handleGoToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="absolute bottom-20 left-4 right-4 z-10">
      <Button 
        onClick={handleGoToCart}
        className="w-full h-12 bg-primary text-primary-foreground shadow-lg rounded-full flex items-center justify-between px-6"
      >
        <div className="flex items-center space-x-2">
          <div className="relative">
            <ShoppingCart className="h-5 w-5" />
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {getTotalItems()}
            </Badge>
          </div>
          <span className="font-medium">{getTotalItems()} items</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-bold">₹{getTotalPrice()}</span>
          <span className="text-sm">View Cart</span>
        </div>
      </Button>
    </div>
  );
};

export default CartBanner;
