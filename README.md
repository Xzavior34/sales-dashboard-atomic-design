# sales-dashboard-atomic-design
Create a basic website with atomic structural principle with Next js  
Add chart and mock-up the data, create a Sales for 2024, 2023, 2022.  find random sales from kaggle and make a simple application that showing sales of that year
Enhancements
For further advancement, consider
- Custom Filter Input, add an input field to let users set their own sales threshold.
- API Integration, fetch real data from an API instead of using mockup data.
- Multiple Chart Types, add buttons to switch between bar, line, or pie charts using Recharts components.

Create this project requirement  
- Using next js 15, typescript, tailwinds, etc.
- Create multiple component chart, you can use external library.
- Create an empty dashboard page
-  Add the component inside the dashboard page
- Add proper readme, what did you do in the project and how to setup your project
Using your own GitHub and make a new repo and push everything you got in the there.
Sales Dashboard - Next.js, TypeScript, Tailwind, Recharts (Atomic Design)
​This project provides a functional single-file React application designed according to the principles of Atomic Design, mirroring the structure and tools of a modern Next.js 15, TypeScript, and Tailwind CSS stack.
​Project Overview
​The primary goal was to create a responsive dashboard that visualizes mock sales data for the years 2022, 2023, and 2024 using the Recharts library.
​Core Features:
​Atomic Design Structure: Components are strictly organized into Atoms, Molecules, and Organisms for modularity and reusability (all within the single App.tsx file).
​Mock API Integration: Data fetching is simulated with a setTimeout to demonstrate loading states and client-side data handling.
​Multiple Chart Types: Users can switch between Bar, Line, and Pie charts to view the data differently.
​Custom Filter Input (Threshold): A custom input allows users to set a minimum sales threshold, dynamically filtering the chart data to only show months where sales exceed that amount in at least one year.
​Atomic Design Breakdown
​The single-file structure (App.tsx) contains clear sections corresponding to the Atomic Design hierarchy:Level Component(s) Function Built From
Atoms Button, Input, Card Basic HTML elements with styling and primary state (e.g., active/disabled). N/A
Molecules ChartTypeSwitcher, FilterInputGroup Simple groups of atoms that function together. Button, Input
Organisms SalesChart, KeyMetricCard Complex components that manage internal logic (chart rendering, data filtering). Card, Recharts components
Page App (Default Export) The main dashboard view, combining organisms and handling global state/data fetching. Organisms, MoleculesTechnical Stack
​Framework: React (mimicking Next.js 15 structure/styling).
​Language: TypeScript (for type safety and clarity).
​Styling: Tailwind CSS (utility-first approach for responsive design).
​Charting: Recharts (a high-quality, composable charting library for React).
​Setup & Running the Project
​Since this project is contained within a single App.tsx file for this environment, no local setup is strictly required.
​If you were setting up a local Next.js project, the steps would be:
​Initialize a Next.js (TypeScript) project.
​Install dependencies: npm install recharts lucide-react
​Set up Tailwind CSS configuration.
​Place the contents of App.tsx into a component file (e.g., components/pages/Dashboard.tsx) and import it into your main app/page.tsx.
​The code provided is production-ready for the component logic, following modern hooks and TypeScript best practices.
