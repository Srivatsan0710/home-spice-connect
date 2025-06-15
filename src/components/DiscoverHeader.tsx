
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface DiscoverHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const DiscoverHeader = ({ searchQuery, setSearchQuery }: DiscoverHeaderProps) => {
  const { getTotalItems, getTotalPrice } = useCart();
  const { toast } = useToast();

  const handleCartClick = () => {
    if (getTotalItems() > 0) {
      window.location.href = '/checkout';
    } else {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart first",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-white border-b">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search dishes, cooks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          {getTotalItems() > 0 && (
            <Button onClick={handleCartClick} className="relative">
              Cart ({getTotalItems()})
              <Badge className="ml-2">₹{getTotalPrice()}</Badge>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscoverHeader;
