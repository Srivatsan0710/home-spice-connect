
import NotificationCenter from "@/components/NotificationCenter";
import OrderTracking from "@/components/OrderTracking";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const currentOrder = {
    id: "ORD001",
    status: "cooking" as const,
    estimatedTime: "25 mins"
  };

  return (
    <div className="pb-16">
      <header className="sticky top-0 z-10 bg-background/80 p-4 backdrop-blur-sm">
        <h1 className="text-2xl font-bold font-serif text-primary">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Track your orders and stay updated</p>
      </header>

      <main className="p-4 space-y-6">
        {/* Current Order Tracking */}
        <OrderTracking order={currentOrder} />
        
        {/* Notifications */}
        <NotificationCenter />
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">127</p>
              <p className="text-sm text-muted-foreground">Total Orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">23</p>
              <p className="text-sm text-muted-foreground">Favorites</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
