
import Header from "@/components/Header";
import SignupForm from "@/components/SignupForm";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50 to-white islamic-pattern">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <SignupForm />
        </div>
      </main>
      
      <footer className="bg-emerald-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Markaz-e-Darood. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Signup;
