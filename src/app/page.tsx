"use client";

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

/**
 * Root Page Component
 * This component handles the root path ('/') and immediately redirects 
 * the user to the '/dashboard' route where the content is located.
 */
export default function Home() {
  // Use the Next.js navigation redirect to move the user immediately
  useEffect(() => {
    // Note: The `redirect` function from 'next/navigation' should ideally 
    // be used outside of useEffect in a Server Component for hard redirects,
    // but a client-side solution is used here for simplicity and broader compatibility 
    // when setting up the initial root page.
    redirect('/dashboard');
  }, []);

  // Show a loading message in case the client-side redirection is slow
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <p className="text-xl text-gray-700">Loading Dashboard...</p>
    </div>
  );
}

