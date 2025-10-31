"use client";

import React, { useState, useMemo } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

import { 
    DollarSign, 
    Filter, 
    TrendingUp, 
    Cpu, 
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
// 2. MOCK DATA & CONFIG
// ====================================================================

const fullSalesData: SalesData[] = [
  { month: 'Jan', revenue: 4500, sales: 2400, cost: 2400 },
  { month: 'Feb', revenue: 3500, sales: 2800, cost: 2210 },
  { month: 'Mar', revenue: 6000, sales: 4800, cost: 2290 },
  { month: 'Apr', revenue: 5200, sales: 3908, cost: 2000 },
  { month: 'May', revenue: 5800, sales: 4800, cost: 2181 },
  { month: 'Jun', revenue: 7300, sales: 5800, cost: 2500 },
  { month: 'Jul', revenue: 7800, sales: 6300, cost: 2100 },
];

const mockProductData: ProductData[] = [
  { name: 'Product Alpha', value: 400, color: '#2563eb' }, // blue-600
  { name: 'Product Beta', value: 300, color: '#059669' }, // emerald-600
  { name: 'Product Gamma', value: 300, color: '#d97706' }, // amber-600
  { name: 'Product Delta', value: 200, color: '#b91c1c' }, // red-700
];

const COLORS = mockProductData.map(d => d.color);

// Function to filter data based on the active filter
const filterSalesData = (data: SalesData[], filter: string): SalesData[] => {
    switch (filter) {
        case 'Q2':
            // April to July
            return data.slice(3, 7); 
        case 'H1':
            // January to June
            return data.slice(0, 6);
        case 'YTD':
        default:
            return data;
    }
}

// ====================================================================
// 3. ATOMS (Stat Card Component)
// ====================================================================

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-5 shadow-xl rounded-xl ring-1 ring-gray-100 transition duration-300 hover:shadow-2xl hover:ring-2 hover:ring-opacity-50" style={{ '--tw-ring-color': color } as React.CSSProperties}>
        <div className="flex justify-between items-start">
            <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</span>
                <span className="text-3xl font-extrabold text-gray-900 mt-1">{value}</span>
            </div>
            <div className="p-3 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: color }}>
                <Icon className="h-6 w-6 text-white" />
            </div>
        </div>
    </div>
);

// ====================================================================
// 4. MAIN PAGE COMPONENT
// ====================================================================

export default function DashboardPage() {
    const [activeFilter, setActiveFilter] = useState('YTD');

    // Filtered data based on state
    const salesData = useMemo(() => filterSalesData(fullSalesData, activeFilter), [activeFilter]);

    // Recalculate totals based on filtered data
    const totalRevenue = useMemo(() => salesData.reduce((sum, item) => sum + item.revenue, 0), [salesData]);
    const totalSales = useMemo(() => salesData.reduce((sum, item) => sum + item.sales, 0), [salesData]);

    const stats = useMemo(() => [
        { title: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: '#2563eb' },
        { title: 'Units Sold', value: totalSales.toLocaleString(), icon: BarChartIcon, color: '#059669' },
        { title: 'Growth Rate', value: '+12.5%', icon: TrendingUp, color: '#d97706' },
        { title: 'Conversion', value: '3.1%', icon: Cpu, color: '#b91c1c' },
    ], [totalRevenue, totalSales]);
    
  return (
    // Base layout ensures mobile-friendly padding and background
    <div className="min-h-screen bg-slate-50 font-sans p-4 sm:p-6 lg:p-10">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b pb-4">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Sales Dashboard</h1>
        
        {/* Filter Selection UI */}
        <div className="flex space-x-2 mt-4 sm:mt-0 bg-white p-1 rounded-lg shadow-inner border">
          {['YTD', 'H1', 'Q2'].map((f) => (
            <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`flex items-center text-sm font-semibold rounded-md px-3 py-1.5 transition duration-200 ${
                    activeFilter === f
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
                <Filter className="w-4 h-4 mr-1" />
                <span>{f}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Stats Grid - Enhanced gap and padding */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      {/* Main Charts - Responsive grid structure */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue & Sales Line/Bar Chart (2/3 width) */}
        <div className="lg:col-span-2 bg-white p-6 shadow-2xl rounded-2xl border border-gray-100 h-[450px]">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Monthly Performance ({activeFilter})</h2>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={salesData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="month" stroke="#4b5563" />
                <YAxis yAxisId="left" stroke="#2563eb" tickFormatter={(value) => `$${value/1000}k`} />
                <YAxis yAxisId="right" orientation="right" stroke="#059669" />
                <Tooltip 
                    contentStyle={{ borderRadius: '12px', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)', border: 'none' }} 
                    labelStyle={{ fontWeight: 'bold', color: '#1f2937' }}
                    separator=": "
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                
                <Bar yAxisId="left" dataKey="revenue" fill="#2563eb" name="Revenue" radius={[6, 6, 0, 0]} barSize={20} />
                <Line yAxisId="right" type="monotone" dataKey="sales" stroke="#059669" name="Sales Volume" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Product Mix Pie Chart (1/3 width) */}
        <div className="lg:col-span-1 bg-white p-6 shadow-2xl rounded-2xl border border-gray-100 h-[450px]">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Sales by Product Mix</h2>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Pie 
                data={mockProductData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60} // Added inner radius for a donut chart style
                outerRadius={120}
                paddingAngle={5} // Added padding for separation
                fill="#8884d8"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {mockProductData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => [`$${(value as number).toLocaleString()}`, name]}
                contentStyle={{ borderRadius: '12px', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)', border: 'none' }}
              />
              <Legend iconType="circle" layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ paddingLeft: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

