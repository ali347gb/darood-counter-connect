
import React, { useState } from "react";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockUsers } from "@/lib/mock-data"; // Using mock data for demonstration
import { User } from "@/types";
import { toast } from "@/hooks/use-toast";

const ParticipantsReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState<User[]>(mockUsers);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredParticipants = participants.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.location?.city || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.location?.country || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const refreshData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setParticipants(mockUsers);
      setLoading(false);
      toast({
        title: "Data refreshed",
        description: "Participants data has been updated.",
      });
    }, 800);
  };

  const downloadReport = () => {
    // Create CSV content
    const headers = ["Name", "Email", "Phone Number", "City", "Country"];
    const csvContent = [
      headers.join(","),
      ...filteredParticipants.map((user) => {
        return [
          user.name,
          user.email,
          user.phoneNumber || "N/A",
          user.location?.city || "N/A",
          user.location?.country || "N/A",
        ].join(",");
      }),
    ].join("\n");

    // Create blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "participants-report.csv";
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Report downloaded",
      description: "Participants report has been downloaded as CSV.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search participants..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={refreshData} 
            disabled={loading}
            className="text-emerald-700 border-emerald-200"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button 
            onClick={downloadReport}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Download className="mr-2 h-4 w-4" />
            Download CSV
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>List of all participants.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Country</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParticipants.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No participants found.
                </TableCell>
              </TableRow>
            ) : (
              filteredParticipants.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber || "N/A"}</TableCell>
                  <TableCell>{user.location?.city || "N/A"}</TableCell>
                  <TableCell>{user.location?.country || "N/A"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ParticipantsReport;
