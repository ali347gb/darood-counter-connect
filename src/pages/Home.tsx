
import { useCounter } from "@/contexts/CounterContext";
import Header from "@/components/Header";
import CounterStats from "@/components/CounterStats";

const Home = () => {
  const { communityStats } = useCounter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50 to-white islamic-pattern">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 mt-8">
            <h1 className="text-4xl font-bold text-emerald-800 mb-4">
              Darood-e-Pak Counter
            </h1>
            <p className="text-lg text-emerald-700 mb-6">
              Join the global community in sending blessings upon the Prophet Muhammad (Peace Be Upon Him)
            </p>
            <div className="space-y-2">
              <p className="text-emerald-800 font-semibold text-xl mb-4">
                ٱللَّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ
              </p>
              <p className="text-emerald-700 italic">
                "O Allah, send blessings upon Muhammad and upon the family of Muhammad"
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold text-center mb-6 text-emerald-800">
              Community Impact
            </h2>
            
            <CounterStats 
              stats={communityStats} 
              title="Collective Recitations" 
              subtitle={`From ${communityStats.usersCount} participants and growing`}
            />
            
            <div className="mt-8 text-center">
              <p className="text-md text-emerald-600">
                Join us in our mission to increase the recitation of Darood-e-Pak globally.
                Create an account to track your personal contributions.
              </p>
            </div>
          </div>
          
          <div className="text-center my-12">
            <h2 className="text-2xl font-semibold text-emerald-800 mb-4">About Darood-e-Pak</h2>
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <p className="mb-4 text-gray-700">
                Reciting Darood-e-Pak (sending blessings upon Prophet Muhammad ﷺ) is an act of devotion and love.
                The Prophet said, "Whoever sends blessings upon me once, Allah will send blessings upon him ten times."
              </p>
              <p className="mb-4 text-gray-700">
                This application helps you keep track of your recitations and see the collective impact
                of the global community's devotion.
              </p>
              <p className="text-gray-700">
                Start today by creating an account and joining our effort to increase the recitation of 
                Darood-e-Pak worldwide.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-emerald-800 text-white py-6">
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

export default Home;
