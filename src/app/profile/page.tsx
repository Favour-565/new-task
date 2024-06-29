"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; fullName: string } | null>(null);

  useEffect(() => {
    // Replace this with your authentication check
    const authenticated = true;

    if (!authenticated) {
      router.push('/login');
    } else {
      // Fetch user data from your API or state management
      setUser({ email: '', fullName: '' });
    }
  }, [router]);

  const handleLogout = () => {
    // Handle logout logic here
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-4">Profile</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Full Name:</strong> {user.fullName}</p>
        <button onClick={handleLogout} className="mt-4 w-full bg-red-500 text-white py-2 rounded">Logout</button>
      </div>
    </div>
  );
};

export default Profile;
