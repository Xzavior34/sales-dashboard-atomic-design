"use client";

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

/**
 * Root Page Component
 * This component handles the root path ('/') and immediately redirects 
 * the user to the '/dashboard' route where the content is located.
 */
export default function Home() {
  // Redirect the user to the dashboard route as soon as the component mounts on the client.
  useEffect(() => {
    redirect('/dashboard');
  }, []);

  // Show a loading message in case the client-side redirection is slow
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <p className="text-xl text-gray-700">Loading Dashboard...</p>
    </div>
  );
}
