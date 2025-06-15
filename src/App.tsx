
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BottomNav from "./components/BottomNav";
import CookProfile from "./pages/CookProfile";
import DetailedCookProfile from "./pages/DetailedCookProfile";
import Discover from "./pages/Discover";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import DishDetail from "./pages/DishDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CartDrawer from "./components/CartDrawer";
import { CartProvider } from "./contexts/CartContext";
import { UserPreferencesProvider } from "./contexts/UserPreferencesContext";
import Subscriptions from "./pages/Subscriptions";
import SearchPage from "./pages/Search";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import CookDashboard from "./pages/CookDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserPreferencesProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="relative mx-auto flex h-screen max-h-[960px] w-full max-w-[450px] flex-col overflow-hidden border-4 border-black rounded-3xl bg-background shadow-2xl">
              <div className="flex-1 overflow-y-auto">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/cook/:id" element={<CookProfile />} />
                  <Route path="/cook/:cookId/profile" element={<DetailedCookProfile />} />
                  <Route path="/discover" element={<Discover />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/subscriptions" element={<Subscriptions />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/cook-dashboard" element={<CookDashboard />} />
                  <Route path="/dish/:dishName" element={<DishDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <BottomNav />
              <CartDrawer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </UserPreferencesProvider>
  </QueryClientProvider>
);

export default App;
