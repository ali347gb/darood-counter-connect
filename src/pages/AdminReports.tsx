
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import ParticipantsReport from "@/components/ParticipantsReport";
import ParticipantsStatsReport from "@/components/ParticipantsStatsReport";
import VisitorsReport from "@/components/VisitorsReport";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminReports = () => {
  const { currentUser, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("participants");

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
            <CardTitle className="text-2xl font-bold text-emerald-800">Admin Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="participants">Participants List</TabsTrigger>
                <TabsTrigger value="stats">Participation Stats</TabsTrigger>
                <TabsTrigger value="visitors">Visitors Report</TabsTrigger>
              </TabsList>
              <TabsContent value="participants">
                <ParticipantsReport />
              </TabsContent>
              <TabsContent value="stats">
                <ParticipantsStatsReport />
              </TabsContent>
              <TabsContent value="visitors">
                <VisitorsReport />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminReports;
