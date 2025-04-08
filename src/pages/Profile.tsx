
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import UserProfileForm from "@/components/UserProfileForm";

const Profile = () => {
  const { currentUser } = useAuth();
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50 to-white">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-emerald-800">
              Your Profile
            </h1>
            <p className="text-md text-emerald-600 mt-2">
              Update your personal information
            </p>
          </div>

          <UserProfileForm />
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

export default Profile;
