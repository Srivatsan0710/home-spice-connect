
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Minus, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    toast({
      title: "Order placed!",
      description: `${getTotalItems()} items ordered for ₹${getTotalPrice()}`,
    });
    
    clearCart();
    navigate('/orders');
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items removed from cart",
    });
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-full bg-secondary/30">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-lg font-bold">Cart</h1>
            <div className="w-16" />
          </div>
        </div>

        {/* Empty Cart */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground text-center mb-6">
            Browse our delicious home-cooked meals and add them to your cart
          </p>
          <Button onClick={() => navigate('/')}>
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-secondary/30">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-lg font-bold">Cart ({getTotalItems()})</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearCart}
            className="text-destructive"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 p-4 space-y-4">
        {items.map((item) => (
          <Card key={item.dishName} className="p-4">
            <div className="flex space-x-4">
              <img 
                src={item.image} 
                alt={item.dishName}
                className="h-20 w-20 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg mb-1">{item.dishName}</h3>
                <p className="text-sm text-muted-foreground mb-2">by {item.cookName}</p>
                <p className="text-lg font-bold text-primary mb-3">₹{item.price}</p>
                
                {/* Quantity Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.dishName, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-bold text-lg min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.dishName, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.dishName)}
                    className="text-destructive"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom Summary */}
      <div className="sticky bottom-0 bg-white border-t p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">Total ({getTotalItems()} items)</span>
          <span className="text-2xl font-bold text-primary">₹{getTotalPrice()}</span>
        </div>
        
        <Button 
          onClick={handleCheckout} 
          className="w-full h-12 text-lg"
          size="lg"
        >
          Proceed to Checkout
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="w-full"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default Cart;
