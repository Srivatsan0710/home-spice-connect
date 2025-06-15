
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePlaceOrder = () => {
    toast({
      title: "Order placed successfully!",
      description: `${getTotalItems()} items ordered for ₹${getTotalPrice()}`,
    });
    clearCart();
    navigate('/orders');
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-full bg-secondary/30">
        <div className="sticky top-0 z-10 bg-white border-b">
          <div className="flex items-center justify-between p-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-lg font-bold">Checkout</h1>
            <div className="w-16" />
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">No items in cart</h2>
            <p className="text-muted-foreground mb-4">Add some delicious meals to checkout</p>
            <Button onClick={() => navigate('/')}>Browse Meals</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-secondary/30">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-lg font-bold">Checkout</h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {/* Delivery Information */}
        <Card className="p-4">
          <h3 className="font-bold text-lg mb-3">Delivery Details</h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-primary" />
              <div>
                <p className="font-medium">Delivery Date</p>
                <p className="text-sm text-muted-foreground">Today, {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Clock className="h-4 w-4 text-primary" />
              <div>
                <p className="font-medium">Delivery Time</p>
                <p className="text-sm text-muted-foreground">6:00 PM - 8:00 PM</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-primary" />
              <div>
                <p className="font-medium">Delivery Address</p>
                <p className="text-sm text-muted-foreground">123 Main Street, Bangalore, Karnataka</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Order Items */}
        <Card className="p-4">
          <h3 className="font-bold text-lg mb-3">Order Summary</h3>
          
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.dishName} className="flex items-center space-x-3">
                <img 
                  src={item.image} 
                  alt={item.dishName}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.dishName}</h4>
                  <p className="text-sm text-muted-foreground">by {item.cookName}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      Today
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      6:00 PM - 8:00 PM
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{item.price}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="p-4">
          <h3 className="font-bold text-lg mb-3">Payment Method</h3>
          
          <div className="flex items-center space-x-3 p-3 border rounded-lg bg-secondary/20">
            <CreditCard className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Cash on Delivery</p>
              <p className="text-sm text-muted-foreground">Pay when your order arrives</p>
            </div>
          </div>
        </Card>

        {/* Bill Details */}
        <Card className="p-4">
          <h3 className="font-bold text-lg mb-3">Bill Details</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Item Total ({getTotalItems()} items)</span>
              <span>₹{getTotalPrice()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes & Charges</span>
              <span>₹{Math.round(getTotalPrice() * 0.05)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span>₹{getTotalPrice() + Math.round(getTotalPrice() * 0.05)}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Actions */}
      <div className="sticky bottom-0 bg-white border-t p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="text-xl font-bold text-primary">₹{getTotalPrice() + Math.round(getTotalPrice() * 0.05)}</p>
          </div>
          <Button onClick={handlePlaceOrder} size="lg" className="px-8">
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
