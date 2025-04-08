
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const NavLinks = () => (
    <>
      <Link 
        to="/" 
        className="text-emerald-700 hover:text-emerald-900 px-3 py-2 rounded-md text-sm font-medium"
      >
        Home
      </Link>
      <Link 
        to="/dashboard" 
        className="text-emerald-700 hover:text-emerald-900 px-3 py-2 rounded-md text-sm font-medium"
      >
        Dashboard
      </Link>
      <Link 
        to="/media" 
        className="text-emerald-700 hover:text-emerald-900 px-3 py-2 rounded-md text-sm font-medium"
      >
        Media
      </Link>
      <Link 
        to="/library" 
        className="text-emerald-700 hover:text-emerald-900 px-3 py-2 rounded-md text-sm font-medium"
      >
        Library
      </Link>
      {isAdmin && (
        <Link 
          to="/admin" 
          className="text-amber-600 hover:text-amber-800 px-3 py-2 rounded-md text-sm font-medium"
        >
          Admin
        </Link>
      )}
      {currentUser && (
        <Link 
          to="/profile" 
          className="text-emerald-700 hover:text-emerald-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
        >
          <User className="w-4 h-4 mr-1" /> Profile
        </Link>
      )}
    </>
  );

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-emerald-600 font-bold text-xl mr-1">Darood</span>
              <span className="text-amber-600 font-bold text-xl">Counter</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <div className="flex items-center space-x-2">
              <NavLinks />
            </div>
          </nav>
          
          {/* Auth buttons or user info */}
          <div className="hidden md:flex items-center">
            {currentUser ? (
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-4">
                  {currentUser.name}
                </span>
                <Button
                  variant="outline"
                  className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-x-2">
                <Button
                  variant="outline"
                  className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                  asChild
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button 
                  className="bg-emerald-600 hover:bg-emerald-700" 
                  asChild
                >
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-emerald-600 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-3 space-y-1 px-4 shadow-lg">
          <div className="space-y-1 py-2">
            <NavLinks />
          </div>
          
          {/* Auth buttons for mobile */}
          <div className="pt-4 border-t border-gray-200">
            {currentUser ? (
              <div className="flex flex-col space-y-2">
                <span className="text-sm text-gray-600">
                  {currentUser.name}
                </span>
                <Button
                  variant="outline"
                  className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Button
                  variant="outline"
                  className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                  asChild
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button 
                  className="bg-emerald-600 hover:bg-emerald-700" 
                  asChild
                >
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
