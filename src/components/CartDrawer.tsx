
import { ShoppingCart, Plus, Minus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems, clearCart } = useCart();
  const navigate = useNavigate();

  if (getTotalItems() === 0) {
    return null;
  }

  const handleCheckout = () => {
    // Navigate to orders page for now (checkout implementation would come later)
    navigate('/orders');
    clearCart();
  };

  const handleViewFullCart = () => {
    navigate('/cart');
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="fixed bottom-20 right-4 z-50 rounded-full h-14 w-14 shadow-lg">
          <div className="relative">
            <ShoppingCart className="h-6 w-6" />
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {getTotalItems()}
            </Badge>
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Your Cart</DrawerTitle>
            <DrawerDescription>
              {getTotalItems()} items • ₹{getTotalPrice()}
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="p-4 space-y-3 max-h-60 overflow-y-auto">
            {items.map((item) => (
              <div key={item.dishName} className="flex items-center space-x-3 bg-secondary/20 p-3 rounded-lg">
                <img 
                  src={item.image} 
                  alt={item.dishName}
                  className="h-12 w-12 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.dishName}</p>
                  <p className="text-xs text-muted-foreground">by {item.cookName}</p>
                  <p className="text-sm font-bold text-primary">₹{item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.dishName, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="font-bold min-w-[1.5rem] text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.dishName, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeFromCart(item.dishName)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <DrawerFooter>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold">Total: ₹{getTotalPrice()}</span>
            </div>
            <Button onClick={handleViewFullCart} variant="outline" className="w-full mb-2">
              View Full Cart
            </Button>
            <DrawerClose asChild>
              <Button onClick={handleCheckout} className="w-full">
                Quick Checkout
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
