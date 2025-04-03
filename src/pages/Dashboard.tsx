
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCounter } from "@/contexts/CounterContext";
import Header from "@/components/Header";
import CounterButton from "@/components/CounterButton";
import CounterStats from "@/components/CounterStats";
import { Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { userSummary, isLoading, communityStats } = useCounter();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50 to-white islamic-pattern">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-emerald-800">
              Your Darood Counter
            </h1>
            <p className="text-md text-emerald-600 mt-2">
              Track and increase your recitations of Darood-e-Pak
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-emerald-800">Recite Darood-e-Pak</h2>
                    <p className="text-sm text-emerald-600 mt-1">Click after each recitation</p>
                  </div>
                  
                  <div className="flex justify-center my-8">
                    <CounterButton />
                  </div>
                  
                  <div className="text-center mt-6">
                    <p className="arabic-font text-lg">
                      ٱللَّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 italic">
                      "O Allah, send blessings upon Muhammad and upon the family of Muhammad"
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="text-center mb-2">
                    <h2 className="text-xl font-semibold text-emerald-800">Community Impact</h2>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Total Recitations</p>
                      <p className="text-2xl font-bold text-gold-700">
                        {communityStats.total.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Total Participants</p>
                      <p className="text-2xl font-bold text-emerald-700">
                        {communityStats.usersCount}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-6">
                  <CounterStats
                    stats={userSummary}
                    title="Your Statistics"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-emerald-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Darood Counter. All rights reserved.</p>
          <p className="text-emerald-200 text-sm mt-2">
            Designed with love for the Muslim Ummah.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
