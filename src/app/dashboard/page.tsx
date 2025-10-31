import React, { useState, useEffect, useMemo } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { DollarSign, Filter, TrendingUp, Cpu, PieChartIcon } from 'lucide-react';

// ====================================================================
// 1. TYPESCRIPT INTERFACES
// ====================================================================

/** Defines the structure for a single month's aggregated sales data. */
interface SalesDataPoint {
  month: string;
  sales2022: number;
  sales2023: number;
  sales2024: number;
}

/** Defines the structure for the Pie Chart, aggregated by year. */
interface PieDataPoint {
    name: string;
    value: number;
    color: string;
}

/** Supported chart types */
type ChartType = 'Bar' | 'Line' | 'Pie';

// ====================================================================
// 2. MOCK DATA & API INTEGRATION (Organism Logic)
// ====================================================================

// Mock data inspired by general sales data structures on Kaggle, aggregated by month.
const MOCK_SALES_DATA: SalesDataPoint[] = [
  { month: 'Jan', sales2022: 4000, sales2023: 5000, sales2024: 6500 },
  { month: 'Feb', sales2022: 3000, sales2023: 4500, sales2024: 5500 },
  { month: 'Mar', sales2022: 5000, sales2023: 6000, sales2024: 7000 },
  { month: 'Apr', sales2022: 4500, sales2023: 5500, sales2024: 8000 },
  { month: 'May', sales2022: 6000, sales2023: 7500, sales2024: 9000 },
  { month: 'Jun', sales2022: 5500, sales2023: 6500, sales2024: 8500 },
  { month: 'Jul', sales2022: 7000, sales2023: 8000, sales2024: 9500 },
  { month: 'Aug', sales2022: 6500, sales2023: 7000, sales2024: 8800 },
  { month: 'Sep', sales2022: 7500, sales2023: 8500, sales2024: 10000 },
  { month: 'Oct', sales2022: 8000, sales2023: 9000, sales2024: 11000 },
  { month: 'Nov', sales2022: 9000, sales2023: 10000, sales2024: 12000 },
  { month: 'Dec', sales2022: 10000, sales2023: 11000, sales2024: 13000 },
];

/** Mock API Fetcher (Simulates real API integration) */
const fetchSalesData = (): Promise<SalesDataPoint[]> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(MOCK_SALES_DATA);
    }, 1500);
  });
};

// ====================================================================
// 3. ATOMS (The smallest UI building blocks)
// ====================================================================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  isActive?: boolean;
}

/** Atom: Standard Button Component */
const Button: React.FC<ButtonProps> = ({ children, onClick, className, variant = 'primary', isActive = false, ...props }) => {
  let baseClasses = 'px-4 py-2 font-semibold text-sm rounded-lg transition duration-150 shadow-md transform active:scale-95 disabled:opacity-50';

  switch (variant) {
    case 'primary':
      baseClasses += ' bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300';
      break;
    case 'secondary':
      baseClasses += ' bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-4 focus:ring-gray-300';
      break;
    case 'ghost':
      baseClasses += ' bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-4 focus:ring-blue-100';
      break;
  }

  if (isActive) {
      baseClasses = 'px-4 py-2 font-bold text-sm rounded-lg shadow-inner bg-blue-700 text-white transition duration-150 transform active:scale-95';
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/** Atom: Standard Input Component */
const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${className || ''}`}
      {...props}
    />
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
}

/** Atom/Wrapper: Standard Card Component */
const Card: React.FC<CardProps> = ({ children, className, title, icon }) => (
  <div className={`bg-white p-6 rounded-xl shadow-lg border border-gray-100 ${className || ''}`}>
    {(title || icon) && (
      <header className="flex items-center mb-4 border-b pb-3 text-gray-700">
        {icon && <span className="mr-3 text-blue-500">{icon}</span>}
        {title && <h2 className="text-xl font-bold">{title}</h2>}
      </header>
    )}
    {children}
  </div>
);

// ====================================================================
// 4. MOLECULES (Combinations of atoms with specific function)
// ====================================================================

interface ChartTypeSwitcherProps {
  currentType: ChartType;
  onTypeChange: (type: ChartType) => void;
}

/** Molecule: Component to switch between different chart views */
const ChartTypeSwitcher: React.FC<ChartTypeSwitcherProps> = ({ currentType, onTypeChange }) => {
  const types: ChartType[] = ['Bar', 'Line', 'Pie'];
  const icons = {
      'Bar': <BarChartIcon size={16} />,
      'Line': <TrendingUp size={16} />,
      'Pie': <PieChartIcon size={16} />,
  }

  return (
    <div className="flex space-x-2 p-1 bg-gray-100 rounded-lg shadow-inner">
      {types.map((type) => (
        <Button
          key={type}
          onClick={() => onTypeChange(type)}
          isActive={currentType === type}
          variant='ghost' // Ghost variant is base, isActive overrides
          className={`flex items-center text-gray-700 ${currentType === type ? 'text-white' : 'hover:bg-gray-200'}`}
        >
            {icons[type]}
            <span className='ml-1'>{type}</span>
        </Button>
      ))}
    </div>
  );
};

interface FilterInputGroupProps {
  threshold: number;
  onThresholdChange: (value: number) => void;
  isLoading: boolean;
}

/** Molecule: Custom Filter Input Group */
const FilterInputGroup: React.FC<FilterInputGroupProps> = ({ threshold, onThresholdChange, isLoading }) => {
  const [inputValue, setInputValue] = useState(String(threshold));

  useEffect(() => {
      // Keep input value in sync with prop state changes (e.g., on initial load)
      setInputValue(String(threshold));
  }, [threshold]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    const numValue = parseInt(value, 10);
    // Only call prop handler if it's a valid number
    if (!isNaN(numValue) && numValue >= 0) {
      onThresholdChange(numValue);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
      <label htmlFor="threshold" className="text-sm font-medium text-gray-700 flex items-center">
        <Filter size={16} className="mr-2 text-red-500" />
        Sales Threshold Filter ($):
      </label>
      <div className="w-full sm:w-40">
        <Input
          id="threshold"
          type="number"
          placeholder="e.g., 5000"
          value={inputValue}
          onChange={handleInputChange}
          disabled={isLoading}
          min="0"
          className='w-full'
        />
      </div>
    </div>
  );
};


// ====================================================================
// 5. ORGANISMS (Complex sections built from molecules and atoms)
// ====================================================================

interface SalesChartProps {
  data: SalesDataPoint[];
  chartType: ChartType;
  threshold: number;
}

/** Organism: Renders the chart based on type and filtered data */
const SalesChart: React.FC<SalesChartProps> = ({ data, chartType, threshold }) => {
  const filteredData = useMemo(() => {
    // Filter out months where all sales years are below the threshold
    return data.filter(d =>
      d.sales2022 >= threshold || d.sales2023 >= threshold || d.sales2024 >= threshold
    );
  }, [data, threshold]);

  // Aggregate data for Pie Chart (Total Sales per Year for all data)
  const pieData: PieDataPoint[] = useMemo(() => {
    const totals = data.reduce((acc, curr) => {
        acc.sales2022 += curr.sales2022;
        acc.sales2023 += curr.sales2023;
        acc.sales2024 += curr.sales2024;
        return acc;
    }, { sales2022: 0, sales2023: 0, sales2024: 0 });

    return [
        { name: '2024 Sales', value: totals.sales2024, color: '#3b82f6' }, // Blue
        { name: '2023 Sales', value: totals.sales2023, color: '#f59e0b' }, // Amber
        { name: '2022 Sales', value: totals.sales2022, color: '#10b981' }, // Emerald
    ];
  }, [data]);

  const renderChart = () => {
    if (filteredData.length === 0 && chartType !== 'Pie') {
        return <div className="text-center p-10 text-gray-500">No data points meet the minimum sales threshold of ${threshold}.</div>;
    }

    // Pie chart is based on aggregated totals, not monthly filtering
    if (chartType === 'Pie') {
        return (
            <ResponsiveContainer width="100%" aspect={1.5} className="mt-4">
                <PieChart>
                    <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
            </ResponsiveContainer>
        );
    }

    const ChartComponent = chartType === 'Bar' ? BarChart : LineChart;
    const DataComponent = chartType === 'Bar' ? Bar : Line;

    return (
        <ResponsiveContainer width="100%" aspect={2.5}>
            <ChartComponent
                data={filteredData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" stroke="#374151" />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} stroke="#374151" />
                <Tooltip
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend />
                <DataComponent dataKey="sales2024" name="2024 Sales" fill={chartType === 'Bar' ? '#3b82f6' : '#3b82f6'} stroke="#3b82f6" />
                <DataComponent dataKey="sales2023" name="2023 Sales" fill={chartType === 'Bar' ? '#f59e0b' : '#f59e0b'} stroke="#f59e0b" />
                <DataComponent dataKey="sales2022" name="2022 Sales" fill={chartType === 'Bar' ? '#10b981' : '#10b981'} stroke="#10b981" />
            </ChartComponent>
        </ResponsiveContainer>
    );
  };

  return (
    <Card title={`Monthly Sales Performance (${chartType} Chart)`} icon={<Cpu size={20} />} className="h-full">
      {renderChart()}
    </Card>
  );
};


// ====================================================================
// 6. TEMPLATES / PAGES (Main application shell)
// ====================================================================

/** The main App component acting as the Dashboard Page */
export default function App() {
  const [salesData, setSalesData] = useState<SalesDataPoint[]>([]);
  const [chartType, setChartType] = useState<ChartType>('Line');
  const [salesThreshold, setSalesThreshold] = useState<number>(5000); // Default threshold
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // API Integration: Fetch mock data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchSalesData();
        setSalesData(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch sales data. Please check the mock API.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Calculate Key Metric (Example of a Card Organism)
  const totalSales2024 = useMemo(() => salesData.reduce((sum, d) => sum + d.sales2024, 0), [salesData]);

  const KeyMetricCard: React.FC<{ title: string; value: number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <Card className="flex flex-col items-start justify-between p-5">
      <div className="flex items-center text-gray-500 mb-2">
        <span className='mr-2 text-blue-500'>{icon}</span>
        <p className="text-sm font-medium">{title}</p>
      </div>
      <p className="text-3xl font-extrabold text-gray-900 mt-1">
        ${value.toLocaleString()}
      </p>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
          Sales Performance Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Analyzing 2022 - 2024 Revenue Trends (Built with Atomic Design, TypeScript, and Recharts).
        </p>
      </header>

      {/* Control Panel: Molecules/Atoms in action */}
      <Card className="mb-8 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <FilterInputGroup
            threshold={salesThreshold}
            onThresholdChange={setSalesThreshold}
            isLoading={isLoading}
          />
          <ChartTypeSwitcher
            currentType={chartType}
            onTypeChange={setChartType}
          />
        </div>
      </Card>

      {/* Main Content: Organisms/Templates */}
      {isLoading ? (
        <Card className="text-center p-20">
          <div className="flex items-center justify-center space-x-3 text-lg font-medium text-blue-600">
            <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading Sales Data... (Simulating API Fetch)</span>
          </div>
        </Card>
      ) : error ? (
        <Card className="bg-red-50 border-red-300 text-red-700 p-6">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
        </Card>
      ) : (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <KeyMetricCard title="Total 2024 Sales" value={totalSales2024} icon={<DollarSign size={20} />} />
                <KeyMetricCard title="Sales Growth (24 vs 23)" value={totalSales2024 - salesData.reduce((sum, d) => sum + d.sales2023, 0)} icon={<TrendingUp size={20} />} />
                <KeyMetricCard title="Data Points Shown" value={chartType !== 'Pie' ? salesData.filter(d => d.sales2022 >= salesThreshold || d.sales2023 >= salesThreshold || d.sales2024 >= salesThreshold).length : 12} icon={<Cpu size={20} />} />
            </div>

            <SalesChart data={salesData} chartType={chartType} threshold={salesThreshold} />
        </div>
      )}

      <footer className="mt-10 text-center text-sm text-gray-500 pt-6 border-t">
        &copy; 2024 Sales Dashboard. Atomic Design Implementation.
      </footer>
    </div>
  );
}

