
import { Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AuthDialog } from "./AuthDialog";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-background/80 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif text-primary">HomeSpice</h1>
          <p className="text-sm text-muted-foreground">Taste of Home, Delivered.</p>
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
      <div className="relative mt-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search for dishes or cooks..." className="pl-10" />
      </div>
    </header>
  );
};

export default Header;
