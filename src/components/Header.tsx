
import { Search, User, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AuthDialog } from "./AuthDialog";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-background/80 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-primary">HomeSpice</h1>
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Taste of Home, Delivered.</p>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <AuthDialog />
        </Dialog>
      </div>
      
      {/* Location and Delivery Info */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Koramangala, Bangalore</span>
          <Badge variant="secondary" className="text-xs">Change</Badge>
        </div>
        <Badge variant="outline" className="text-xs text-green-600 border-green-200">
          Delivering Now
        </Badge>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search 'Aloo Paratha', 'Aunty Manjeet'..." className="pl-10" />
      </div>
    </header>
  );
};

export default Header;
