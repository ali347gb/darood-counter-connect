
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
import { Download, RefreshCw } from "lucide-react";
import { mockUsers } from "@/lib/mock-data"; // Using mock data for demonstration
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

// Get current year
const currentYear = new Date().getFullYear();

const ParticipantsStatsReport = () => {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(currentYear.toString());
  
  // Generate some mock data for the report
  const generateMonthlyStats = (year: number) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    return months.map((month, index) => {
      // Generate random count between 10 and 50
      const monthlyCount = Math.floor(Math.random() * 40) + 10;
      
      // Calculate cumulative count for annual
      const annualCount = monthlyCount * (index + 1);
      
      return {
        name: month,
        monthly: monthlyCount,
        annual: annualCount,
      };
    });
  };

  // Generate stats data based on selected year
  const statsData = generateMonthlyStats(parseInt(year));
  
  // Calculate totals
  const totalMonthly = statsData.reduce((sum, item) => sum + item.monthly, 0);
  const totalAnnual = statsData[statsData.length - 1].annual;

  const refreshData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Data refreshed",
        description: "Statistics data has been updated.",
      });
    }, 800);
  };

  const downloadReport = () => {
    // Create CSV content
    const headers = ["Month", "Monthly Count", "Annual Count"];
    const csvContent = [
      headers.join(","),
      ...statsData.map((item) => {
        return [
          item.name,
          item.monthly,
          item.annual,
        ].join(",");
      }),
      ["Total", totalMonthly, totalAnnual].join(",")
    ].join("\n");

    // Create blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `participation-stats-${year}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Report downloaded",
      description: "Statistics report has been downloaded as CSV.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="w-full sm:w-48">
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger>
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={(currentYear - 2).toString()}>{currentYear - 2}</SelectItem>
              <SelectItem value={(currentYear - 1).toString()}>{currentYear - 1}</SelectItem>
              <SelectItem value={currentYear.toString()}>{currentYear}</SelectItem>
            </SelectContent>
          </Select>
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

      {/* Chart section */}
      <div className="h-80 w-full">
        <ChartContainer 
          config={{
            monthly: { 
              label: "Monthly Count",
              color: "#047857"  // emerald-700
            },
            annual: { 
              label: "Annual Count",
              color: "#0d9488"  // teal-600
            },
          }}
        >
          <BarChart data={statsData}>
            <XAxis dataKey="name" />
            <YAxis />
            <ChartTooltip 
              content={(props) => (
                <ChartTooltipContent 
                  {...props}
                />
              )} 
            />
            <ChartLegend
              content={(props) => (
                <ChartLegendContent 
                  {...props} 
                />
              )}
            />
            <Bar dataKey="monthly" fill="var(--color-monthly)" />
            <Bar dataKey="annual" fill="var(--color-annual)" />
          </BarChart>
        </ChartContainer>
      </div>

      {/* Table section */}
      <div className="rounded-md border">
        <Table>
          <TableCaption>Participation statistics for {year}.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead>Monthly Count</TableHead>
              <TableHead>Annual Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {statsData.map((item) => (
              <TableRow key={item.name}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.monthly}</TableCell>
                <TableCell>{item.annual}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="font-bold">Total</TableCell>
              <TableCell className="font-bold">{totalMonthly}</TableCell>
              <TableCell className="font-bold">{totalAnnual}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ParticipantsStatsReport;
