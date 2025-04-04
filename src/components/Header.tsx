
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Header = () => {
  const { currentUser, logout, isAdmin } = useAuth();

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-emerald-800">
            Darood Counter
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className={navigationMenuTriggerStyle()}>
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about" className={navigationMenuTriggerStyle()}>
                  About
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/library" className={navigationMenuTriggerStyle()}>
                  Library
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/media" className={navigationMenuTriggerStyle()}>
                  Media
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact" className={navigationMenuTriggerStyle()}>
                  Contact
                </Link>
              </NavigationMenuItem>
              {isAdmin && (
                <NavigationMenuItem>
                  <Link to="/admin" className={cn(navigationMenuTriggerStyle(), "bg-amber-100 hover:bg-amber-200 text-amber-800")}>
                    Admin
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" className="text-emerald-700 border-emerald-200">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={logout}
                  className="text-emerald-700 hover:bg-emerald-50"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
