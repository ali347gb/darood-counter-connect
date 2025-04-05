
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockUsers, generateMockCounts } from "@/lib/mock-data";
import { DaroodCount } from "@/types";
import { useToast } from "@/hooks/use-toast";

const AdminEditCounters = () => {
  const { currentUser, isAdmin } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState(mockUsers);
  const [userCounts, setUserCounts] = useState<Record<string, DaroodCount[]>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // If user is not admin, redirect to home page
  if (!currentUser || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Load user counts on mount
  useEffect(() => {
    setIsLoading(true);
    
    // Get counts for all users
    const counts: Record<string, DaroodCount[]> = {};
    users.forEach(user => {
      counts[user.id] = generateMockCounts(user.id);
    });
    
    setUserCounts(counts);
    setIsLoading(false);
  }, []);

  // Handle count change for a specific user and date
  const handleCountChange = (userId: string, date: string, newCount: number) => {
    if (newCount < 0) return;
    
    setUserCounts(prevCounts => {
      const userCountsCopy = { ...prevCounts };
      const userCountsArray = [...(userCountsCopy[userId] || [])];
      
      const countIndex = userCountsArray.findIndex(count => count.date === date);
      
      if (countIndex !== -1) {
        userCountsArray[countIndex] = {
          ...userCountsArray[countIndex],
          count: newCount
        };
      } else {
        userCountsArray.push({
          userId,
          date,
          count: newCount
        });
      }
      
      userCountsCopy[userId] = userCountsArray;
      return userCountsCopy;
    });
  };

  // Save changes for a specific user
  const saveUserChanges = (userId: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: "Success",
        description: "User counts updated successfully",
        variant: "default"
      });
      setIsLoading(false);
    }, 800);
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.phoneNumber && user.phoneNumber.includes(searchTerm))
  );

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  // Get today and yesterday dates
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-emerald-800">Edit User Counters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground mb-6">
              Manage and edit Darood counts for all users. Search for a user and modify their counts.
            </div>
            
            <div className="mb-6">
              <Input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
            
            {isLoading ? (
              <div className="text-center py-8">
                <p>Loading user data...</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-8">
                <p>No users found matching your search criteria.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredUsers.map(user => {
                  const counts = userCounts[user.id] || [];
                  const todayCount = counts.find(c => c.date === today)?.count || 0;
                  const yesterdayCount = counts.find(c => c.date === yesterday)?.count || 0;
                  
                  return (
                    <Card key={user.id} className="p-4 bg-white shadow-sm">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {user.email || user.phoneNumber} ({user.role})
                          </p>
                        </div>
                        <Button
                          onClick={() => saveUserChanges(user.id)}
                          className="mt-2 md:mt-0 bg-emerald-600 hover:bg-emerald-700"
                          disabled={isLoading}
                        >
                          Save Changes
                        </Button>
                      </div>
                      
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Count</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>{formatDate(today)} (Today)</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={todayCount}
                                onChange={e => handleCountChange(user.id, today, parseInt(e.target.value) || 0)}
                                className="w-24"
                                min="0"
                              />
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCountChange(user.id, today, todayCount + 100)}
                              >
                                +100
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>{formatDate(yesterday)} (Yesterday)</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={yesterdayCount}
                                onChange={e => handleCountChange(user.id, yesterday, parseInt(e.target.value) || 0)}
                                className="w-24"
                                min="0"
                              />
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCountChange(user.id, yesterday, yesterdayCount + 100)}
                              >
                                +100
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminEditCounters;
