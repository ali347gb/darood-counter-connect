
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  
  // Get initials from name or email
  const getInitials = (): string => {
    if (currentUser?.name) {
      return currentUser.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    } else if (currentUser?.email) {
      return currentUser.email[0].toUpperCase();
    }
    return "U";
  };

  return (
    <header className="bg-white py-4 px-4 md:px-6 flex items-center justify-between shadow-sm">
      <Link to="/" className="flex items-center space-x-2">
        <div className="bg-emerald-500 text-white p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" />
            <path d="M12 10v6" />
            <path d="M9 13h6" />
            <path d="M15 3v4" />
            <path d="M9 3v4" />
          </svg>
        </div>
        <div>
          <span className="font-bold text-lg text-emerald-800 tracking-tight">Darood Counter</span>
        </div>
      </Link>
      
      <div className="flex items-center space-x-4">
        {currentUser ? (
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50">
                Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={currentUser.photoURL || ""} alt={currentUser.name || "User"} />
                <AvatarFallback className="bg-emerald-100 text-emerald-800">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => logout()}
                className="text-muted-foreground hover:text-emerald-700"
              >
                <LogOut size={18} />
              </Button>
            </div>
          </div>
        ) : (
          <Link to="/login">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Login <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
