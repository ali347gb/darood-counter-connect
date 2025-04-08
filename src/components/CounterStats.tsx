
import { CountSummary } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

interface CounterStatsProps {
  stats: CountSummary;
  title: string;
  subtitle?: string;
}

const CounterStats: React.FC<CounterStatsProps> = ({ stats, title, subtitle }) => {
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-emerald-800">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-100">
          <CardContent className="p-3 md:p-4 text-center">
            <h3 className="text-xs md:text-sm font-medium text-emerald-700 mb-1">Today</h3>
            <p className="text-lg md:text-2xl font-bold text-emerald-800">{formatNumber(stats.daily)}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-100">
          <CardContent className="p-3 md:p-4 text-center">
            <h3 className="text-xs md:text-sm font-medium text-emerald-700 mb-1">This Month</h3>
            <p className="text-lg md:text-2xl font-bold text-emerald-800">{formatNumber(stats.monthly)}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-100">
          <CardContent className="p-3 md:p-4 text-center">
            <h3 className="text-xs md:text-sm font-medium text-emerald-700 mb-1">This Year</h3>
            <p className="text-lg md:text-2xl font-bold text-emerald-800">{formatNumber(stats.annual)}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gold-50 to-white border-gold-100">
          <CardContent className="p-3 md:p-4 text-center">
            <h3 className="text-xs md:text-sm font-medium text-gold-700 mb-1">Total</h3>
            <p className="text-lg md:text-2xl font-bold text-gold-800">{formatNumber(stats.total)}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CounterStats;
