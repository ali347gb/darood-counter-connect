
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
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const Header = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-emerald-800">
            Markaz-e-Darood
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className={cn(navigationMenuTriggerStyle(), "bg-amber-100 hover:bg-amber-200 text-amber-800 flex items-center")}>
                          Admin
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white">
                        <DropdownMenuItem asChild>
                          <Link to="/admin" className="cursor-pointer">Dashboard</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/admin/reports" className="cursor-pointer">Reports</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-emerald-800" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[75vw] sm:w-[350px] py-6">
                <nav className="flex flex-col gap-4">
                  <Link to="/" className="text-lg font-medium hover:text-emerald-700" onClick={handleLinkClick}>
                    Home
                  </Link>
                  <Link to="/about" className="text-lg font-medium hover:text-emerald-700" onClick={handleLinkClick}>
                    About
                  </Link>
                  <Link to="/library" className="text-lg font-medium hover:text-emerald-700" onClick={handleLinkClick}>
                    Library
                  </Link>
                  <Link to="/media" className="text-lg font-medium hover:text-emerald-700" onClick={handleLinkClick}>
                    Media
                  </Link>
                  <Link to="/contact" className="text-lg font-medium hover:text-emerald-700" onClick={handleLinkClick}>
                    Contact
                  </Link>
                  {currentUser && (
                    <Link to="/dashboard" className="text-lg font-medium hover:text-emerald-700" onClick={handleLinkClick}>
                      Dashboard
                    </Link>
                  )}
                  {isAdmin && (
                    <div className="border-t border-gray-200 mt-2 pt-4">
                      <h3 className="font-semibold text-amber-800 mb-2">Admin</h3>
                      <div className="flex flex-col gap-2 pl-2">
                        <Link to="/admin" className="text-lg font-medium hover:text-emerald-700" onClick={handleLinkClick}>
                          Dashboard
                        </Link>
                        <Link to="/admin/reports" className="text-lg font-medium hover:text-emerald-700" onClick={handleLinkClick}>
                          Reports
                        </Link>
                        <Link to="/admin/edit-counters" className="text-lg font-medium hover:text-emerald-700" onClick={handleLinkClick}>
                          Edit Counters
                        </Link>
                      </div>
                    </div>
                  )}
                </nav>
                {currentUser && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      logout();
                      setIsSheetOpen(false);
                    }}
                    className="mt-6 w-full text-emerald-700 border-emerald-200"
                  >
                    Logout
                  </Button>
                )}
                {!currentUser && (
                  <Link to="/login" onClick={handleLinkClick} className="block mt-6">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                      Login
                    </Button>
                  </Link>
                )}
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Login/Logout Buttons */}
          <div className="hidden md:flex items-center space-x-4">
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
