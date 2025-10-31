import React, { useState, useEffect, useMemo } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

// FIX: Corrected icon imports from lucide-react by using aliasing
import { 
    DollarSign, 
    Filter, 
    TrendingUp, 
    Cpu, 
    PieChart as PieChartIcon, 
    BarChart as BarChartIcon 
} from 'lucide-react';

// ====================================================================
// 1. TYPESCRIPT INTERFACES
// ====================================================================

interface SalesData {
  month: string;
  revenue: number;
  sales: number;
  cost: number;
}

interface ProductData {
  name: string;
  value: number;
  color: string;
}

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ElementType;
    color: string;
}

// ====================================================================
// 2. MOCK DATA
// ====================================================================

const mockSalesData: SalesData[] = [
  { month: 'Jan', revenue: 4000, sales: 2400, cost: 2400 },
  { month: 'Feb', revenue: 3000, sales: 1398, cost: 2210 },
  { month: 'Mar', revenue: 2000, sales: 9800, cost: 2290 },
  { month: 'Apr', revenue: 2780, sales: 3908, cost: 2000 },
  { month: 'May', revenue: 1890, sales: 4800, cost: 2181 },
  { month: 'Jun', revenue: 2390, sales: 3800, cost: 2500 },
  { month: 'Jul', revenue: 3490, sales: 4300, cost: 2100 },
];

const mockProductData: ProductData[] = [
  { name: 'Product A', value: 400, color: '#3b82f6' }, // blue-500
  { name: 'Product B', value: 300, color: '#10b981' }, // emerald-500
  { name: 'Product C', value: 300, color: '#f59e0b' }, // amber-500
  { name: 'Product D', value: 200, color: '#ef4444' }, // red-500
];

const COLORS = mockProductData.map(d => d.color);

// ====================================================================
// 3. ATOMS (Stat Card Component)
// ====================================================================

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-4 shadow-xl rounded-xl flex items-center justify-between transition-transform duration-300 hover:scale-[1.02] border-t-4" style={{ borderColor: color }}>
        <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">{title}</span>
            <span className="text-2xl font-bold text-gray-900 mt-1">{value}</span>
        </div>
        <div className="p-3 rounded-full bg-opacity-20" style={{ backgroundColor: color, color: color }}>
            <Icon className="h-6 w-6" />
        </div>
    </div>
);

// ====================================================================
// 4. MAIN PAGE COMPONENT
// ====================================================================

export default function DashboardPage() {
    const [filter, setFilter] = useState('YTD');

    const totalRevenue = useMemo(() => mockSalesData.reduce((sum, item) => sum + item.revenue, 0), []);
    const totalSales = useMemo(() => mockSalesData.reduce((sum, item) => sum + item.sales, 0), []);

    const stats = useMemo(() => [
        { title: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: '#3b82f6' },
        { title: 'Units Sold', value: totalSales.toLocaleString(), icon: BarChartIcon, color: '#10b981' }, // <-- Using aliased Icon
        { title: 'Growth Rate', value: '+12.5%', icon: TrendingUp, color: '#f59e0b' },
        { title: 'Conversion', value: '3.1%', icon: Cpu, color: '#ef4444' },
    ], [totalRevenue, totalSales]);
    
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Sales Dashboard</h1>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button className="flex items-center text-sm font-medium text-gray-600 border border-gray-300 rounded-lg px-3 py-2 bg-white hover:bg-gray-100">
            <Filter className="w-4 h-4 mr-1" />
            <span>Filter: {filter}</span>
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      {/* Main Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue & Sales Line/Bar Chart (2/3 width on desktop) */}
        <div className="lg:col-span-2 bg-white p-6 shadow-xl rounded-xl h-[400px]">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Monthly Performance Overview</h2>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={mockSalesData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#3b82f6" />
                <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} 
                    labelStyle={{ fontWeight: 'bold' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                
                {/* BarChart component from recharts is used here */}
                <Bar yAxisId="left" dataKey="revenue" fill="#3b82f6" name="Revenue" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="sales" stroke="#10b981" name="Sales Volume" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Product Mix Pie Chart (1/3 width on desktop) */}
        <div className="lg:col-span-1 bg-white p-6 shadow-xl rounded-xl h-[400px]">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Sales by Product Mix</h2>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              {/* PieChart component from recharts is used here */}
              <PieChart 
                data={mockProductData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {mockProductData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </PieChart>
              <Tooltip 
                formatter={(value, name, props) => [`$${(value as number).toLocaleString()}`, name]}
                contentStyle={{ borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend iconType="circle" layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ paddingLeft: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

