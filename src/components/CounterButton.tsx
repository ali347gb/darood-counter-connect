
import { useCounter } from "@/contexts/CounterContext";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const CounterButton: React.FC = () => {
  const { incrementCount, isLoading } = useCounter();
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const handleIncrement = async () => {
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please login to count your Darood recitations",
        variant: "default"
      });
      return;
    }
    
    try {
      await incrementCount();
    } catch (error) {
      console.error("Error incrementing count:", error);
    }
  };

  return (
    <Button
      variant="default"
      size="lg"
      className={`w-32 h-32 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 text-white font-semibold text-xl animate-scale-slow ${isLoading ? 'opacity-70' : 'opacity-100'}`}
      onClick={handleIncrement}
      disabled={isLoading || !currentUser}
    >
      {isLoading ? "..." : "Count"}
    </Button>
  );
};

export default CounterButton;
