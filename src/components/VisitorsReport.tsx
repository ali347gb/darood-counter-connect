
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
import { Calendar as CalendarIcon, Download, RefreshCw, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock visitor data
interface Visitor {
  id: string;
  ipAddress: string;
  country: string;
  city: string;
  visitDate: Date;
  pageViews: number;
}

const generateMockVisitors = (): Visitor[] => {
  const visitors: Visitor[] = [];
  const countries = ["USA", "UK", "Canada", "Australia", "Germany", "France", "India", "Japan"];
  const cities = {
    "USA": ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
    "UK": ["London", "Manchester", "Birmingham", "Glasgow", "Liverpool"],
    "Canada": ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
    "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
    "Germany": ["Berlin", "Munich", "Hamburg", "Cologne", "Frankfurt"],
    "France": ["Paris", "Marseille", "Lyon", "Toulouse", "Nice"],
    "India": ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"],
    "Japan": ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Nagoya"]
  };

  for (let i = 0; i < 30; i++) {
    const country = countries[Math.floor(Math.random() * countries.length)];
    const city = cities[country as keyof typeof cities][Math.floor(Math.random() * cities[country as keyof typeof cities].length)];
    const daysAgo = Math.floor(Math.random() * 30);
    const visitDate = new Date();
    visitDate.setDate(visitDate.getDate() - daysAgo);
    
    visitors.push({
      id: `v-${i}`,
      ipAddress: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      country,
      city,
      visitDate,
      pageViews: Math.floor(Math.random() * 10) + 1
    });
  }

  return visitors;
};

const VisitorsReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [visitors, setVisitors] = useState<Visitor[]>(generateMockVisitors());
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredVisitors = visitors.filter(
    (visitor) => {
      const matchesSearch = 
        visitor.ipAddress.includes(searchTerm) ||
        visitor.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visitor.city.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDate = date 
        ? visitor.visitDate.toDateString() === date.toDateString()
        : true;
      
      return matchesSearch && matchesDate;
    }
  );

  const refreshData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setVisitors(generateMockVisitors());
      setLoading(false);
      setDate(undefined);
      toast({
        title: "Data refreshed",
        description: "Visitors data has been updated.",
      });
    }, 800);
  };

  const downloadReport = () => {
    // Create CSV content
    const headers = ["IP Address", "Country", "City", "Visit Date", "Page Views"];
    const csvContent = [
      headers.join(","),
      ...filteredVisitors.map((visitor) => {
        return [
          visitor.ipAddress,
          visitor.country,
          visitor.city,
          format(visitor.visitDate, "yyyy-MM-dd"),
          visitor.pageViews
        ].join(",");
      }),
    ].join("\n");

    // Create blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "visitors-report.csv";
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Report downloaded",
      description: "Visitors report has been downloaded as CSV.",
    });
  };

  const clearDateFilter = () => {
    setDate(undefined);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2 flex-col sm:flex-row">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search visitors..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-8"
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full sm:w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
              <div className="p-2 border-t">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full"
                  onClick={clearDateFilter}
                >
                  Clear filter
                </Button>
              </div>
            </PopoverContent>
          </Popover>
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
          <TableCaption>
            List of website visitors.
            {date && ` Filtered by date: ${format(date, "PPP")}`}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>IP Address</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Visit Date</TableHead>
              <TableHead>Page Views</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVisitors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No visitors found.
                </TableCell>
              </TableRow>
            ) : (
              filteredVisitors.map((visitor) => (
                <TableRow key={visitor.id}>
                  <TableCell className="font-medium">{visitor.ipAddress}</TableCell>
                  <TableCell>{visitor.country}</TableCell>
                  <TableCell>{visitor.city}</TableCell>
                  <TableCell>{format(visitor.visitDate, "yyyy-MM-dd")}</TableCell>
                  <TableCell>{visitor.pageViews}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VisitorsReport;
