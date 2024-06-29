"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faPinterest } from '@fortawesome/free-brands-svg-icons';

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !fullName) {
      setError('All fields are required.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email.');
      return;
    }
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
      setError('Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, and a number.');
      return;
    }
    setError('');

    try {
      const response = await fetch("/api/register", {
        method: 'POST',
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify({ email, password, fullName }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      router.push('/login');
    } catch (err) {
      setError('Failed to register.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 " >
      <div className="bg-white p-8 rounded-lg shadow-lg  max-w-screen-md w-md h-auto md:h-full"> {/* Changed from w-96 to w-128 */}
        <div className="flex flex-col items-center mb-4">
          <div className="border-2 rounded-full p-2 mb-2">
            <FontAwesomeIcon icon={faUser} className="text-blue-500 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-center">Create account!</h2>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4  w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 border-none rounded-none mt-1"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <FontAwesomeIcon icon={faUser} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <hr className="mt-1" />
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <input
                type="email"
                placeholder=" E-mail"
                className="w-full p-2 border-none rounded-none mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FontAwesomeIcon icon={faEnvelope} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <hr className="mt-1" />
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border-none rounded-none mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FontAwesomeIcon icon={faLock} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <hr className="mt-1" />
            </div>
          </div>
          <button type="submit" className="w-40 p-2 bg-blue-500 text-white rounded-lg flex items-center justify-center">
            Create
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
          <hr className="my-4"/>
          <p className="text-center text-gray-600">Or create account using social media!</p>
          <div className="flex justify-center space-x-4">
            <FontAwesomeIcon icon={faFacebook} className="text-blue-600 text-2xl cursor-pointer" />
            <FontAwesomeIcon icon={faTwitter} className="text-blue-400 text-2xl cursor-pointer" />
            <FontAwesomeIcon icon={faPinterest} className="text-red-600 text-2xl cursor-pointer" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
