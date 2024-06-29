"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const router = useRouter();
  
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          setError(data.error);
          return;
        }
  
        localStorage.setItem('user', JSON.stringify(data.user));
  
        router.push('/profile');
      } catch (err) {
        setError('Failed to login.');
      }
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-auto ">
          <div className="flex items-center justify-center mb-4">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-600" />
            <h2 className="text-2xl font-bold text-center">Welcome!</h2>
          </div>
          <p className="text-center text-gray-600 mb-4">Sign in to your account</p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleLogin} className="flex flex-col h-full">
            <div className="mb-4 relative">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-5 border-none rounded-none pl-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FontAwesomeIcon icon={faUser} className="absolute right-3 top-3 text-gray-600" />
              <hr className="mt-1" />
            </div>
            <div className="mb-4 relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-5 border-none rounded-none pl-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FontAwesomeIcon icon={faLock} className="absolute right-3 top-3 text-gray-600" />
              <hr className="mt-1" />
            </div>
            <div className="flex items-center justify-between mb-4 ">
              <label className="flex items-center text-gray-600">
                <input type="checkbox" className="mr-2" />
                Remember me?
              </label>
              <a href="#" className="text-blue-500 text-sm ml-8">Forgot password?</a>
            </div>
            <button type="submit" className="w-40  p-2 bg-blue-500 text-white rounded-lg">Login  <FontAwesomeIcon icon={faArrowRight} className="ml-2" /></button>
          </form>
          
        </div>
      </div>
    );
  };
  
  export default Login;
  