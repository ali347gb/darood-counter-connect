
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart4, ListFilter, Users, Edit } from "lucide-react";

const Admin = () => {
  const { currentUser, isAdmin } = useAuth();

  // If user is not admin, redirect to home page
  if (!currentUser || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-emerald-800">Admin Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground mb-6">
              Welcome to the admin dashboard. From here, you can access various administrative functions and reports.
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <Users className="h-12 w-12 text-emerald-600" />
                    <CardTitle className="text-xl">Participants List</CardTitle>
                    <p className="text-muted-foreground">
                      View and manage all participants with their details.
                    </p>
                    <Link to="/admin/reports?tab=participants" className="mt-2">
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                        View Participants
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <BarChart4 className="h-12 w-12 text-emerald-600" />
                    <CardTitle className="text-xl">Participation Stats</CardTitle>
                    <p className="text-muted-foreground">
                      View statistics about participant activity.
                    </p>
                    <Link to="/admin/reports?tab=stats" className="mt-2">
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                        View Statistics
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <ListFilter className="h-12 w-12 text-emerald-600" />
                    <CardTitle className="text-xl">Visitors Report</CardTitle>
                    <p className="text-muted-foreground">
                      Track website visitors with location data.
                    </p>
                    <Link to="/admin/reports?tab=visitors" className="mt-2">
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                        View Visitors
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <Edit className="h-12 w-12 text-emerald-600" />
                    <CardTitle className="text-xl">Edit Counters</CardTitle>
                    <p className="text-muted-foreground">
                      Manage and edit user Darood counts.
                    </p>
                    <Link to="/admin/edit-counters" className="mt-2">
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                        Edit Counters
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
