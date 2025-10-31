"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  // Added 'Pie' here
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
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

// ====================================================================
// 3. ATOMS (Stat Card Component)
// ====================================================================

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => (
    // Applied enhanced styling: softer shadow, rounded-2xl, and better hover effect
    <div className="bg-white p-5 shadow-lg rounded-2xl ring-1 ring-gray-100 hover:ring-blue-500/50 transition duration-300 hover:shadow-2xl hover:scale-[1.01] cursor-pointer">
        <div className="flex justify-between items-start">
            <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</span>
                {/* Bolder, larger value */}
                <span className="text-3xl font-extrabold text-gray-900 mt-1">{value}</span>
            </div>
            {/* Modified icon container for better contrast (colored background, white icon) */}
            <div className="p-3 rounded-xl flex items-center justify-center" style={{ backgroundColor: color }}>
                <Icon className="h-6 w-6 text-white" />
            </div>
        </div>
    </div>
);

// ====================================================================
// 4. MAIN PAGE COMPONENT
// ====================================================================

export default function App() {
    const [filter, setFilter] = useState('YTD');

    const totalRevenue = useMemo(() => mockSalesData.reduce((sum, item) => sum + item.revenue, 0), []);
    const totalSales = useMemo(() => mockSalesData.reduce((sum, item) => sum + item.sales, 0), []);

    const stats = useMemo(() => [
        // Using richer colors for consistency
        { title: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: '#2563eb' }, // blue-600
        { title: 'Units Sold', value: totalSales.toLocaleString(), icon: BarChartIcon, color: '#059669' }, // emerald-600
        { title: 'Growth Rate', value: '+12.5%', icon: TrendingUp, color: '#d97706' }, // amber-600
        { title: 'Conversion', value: '3.1%', icon: Cpu, color: '#b91c1c' }, // red-700
    ], [totalRevenue, totalSales]);
    
  return (
    // Updated overall background and font
    <div className="min-h-screen bg-slate-50 font-sans p-4 sm:p-6 lg:p-10">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        {/* Title has better font styling */}
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Sales Dashboard</h1>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          {/* Enhanced Filter Button style */}
          <button className="flex items-center text-sm font-semibold border border-blue-300 text-blue-700 bg-blue-50/50 hover:bg-blue-100/70 rounded-full px-4 py-1.5 transition duration-200 shadow-sm">
            <Filter className="w-4 h-4 mr-1" />
            <span>Filter: {filter}</span>
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      {/* Main Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue & Sales Line/Bar Chart (2/3 width on desktop) */}
        {/* Updated shadow, rounded corners, and increased height for better data display */}
        <div className="lg:col-span-2 bg-white p-6 shadow-xl rounded-2xl border border-gray-100 h-[450px]">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Monthly Performance Overview</h2>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={mockSalesData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                {/* Softer grid lines */}
                <CartesianGrid strokeDasharray="4 4" stroke="#f3f4f6" />
                {/* Axis labels are slightly darker gray */}
                <XAxis dataKey="month" stroke="#4b5563" />
                <YAxis yAxisId="left" stroke="#2563eb" tickFormatter={(value) => `$${value/1000}k`} />
                <YAxis yAxisId="right" orientation="right" stroke="#059669" />
                <Tooltip 
                    contentStyle={{ borderRadius: '12px', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)', border: 'none' }} 
                    labelStyle={{ fontWeight: 'bold', color: '#1f2937' }}
                    separator=": "
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                
                <Bar yAxisId="left" dataKey="revenue" fill="#2563eb" name="Revenue" radius={[6, 6, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="sales" stroke="#059669" name="Sales Volume" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Product Mix Pie Chart (1/3 width on desktop) */}
        {/* Updated shadow, rounded corners, and increased height */}
        <div className="lg:col-span-1 bg-white p-6 shadow-xl rounded-2xl border border-gray-100 h-[450px]">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Sales by Product Mix</h2>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Pie 
                data={mockProductData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                labelLine={false}
                // Modified label formatting to be more readable
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {mockProductData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => [`$${(value as number).toLocaleString()}`, name]}
                contentStyle={{ borderRadius: '12px', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)', border: 'none' }}
              />
              {/* Moved legend to the bottom for better balance in a single column */}
              <Legend iconType="circle" layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ paddingTop: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

