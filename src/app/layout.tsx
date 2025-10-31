import './globals.css';

// Define the metadata for the page
export const metadata = {
  title: 'Atomic Sales Dashboard',
  description: 'A dashboard application built with Next.js, TypeScript, and Atomic Design.',
};

// This component wraps all other pages/routes.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Apply a global font class and a minimum height to the body */}
      <body className="font-sans antialiased bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}

