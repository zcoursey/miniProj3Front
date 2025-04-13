import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    zipCode: '',
    username: '',
    password: '',
  });

  const cities = ['Abbeville', 'Anderson', 'Clemson', 'Columbia', 'Greenville', 'Spartanburg'];

  const validateForm = () => {
    const { firstName, lastName, email, zipCode, username, password } = formData;

    if (/\d/.test(firstName) || /\d/.test(lastName)) {
      toast.error('First and last names cannot contain numbers');
      return false;
    }
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!/^\d+$/.test(zipCode)) {
      toast.error('Zip code contains only numbers');
      return false;
    }
    if (/\s/.test(username) || /^[^a-zA-Z]/.test(username)) {
      toast.error('Username cannot contain spaces or start with a number/special character');
      return false;
    }
    if (password.length < 10 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
      toast.error('Password must be at least 10 characters with uppercase, lowercase, and numbers');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || 'Registration failed');
      } else {
        toast.success('Registration successful!');
        console.log('Registered user:', data.user);
        setTimeout(() => navigate('/login'), 1500); 
      }
    } catch (error) {
      toast.error('Server error during registration');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name, Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <InputField label="First Name" id="firstName" value={formData.firstName} setFormData={setFormData} />
            <InputField label="Last Name" id="lastName" value={formData.lastName} setFormData={setFormData} />
          </div>

          {/* Email */}
          <InputField label="Email" id="email" type="email" value={formData.email} setFormData={setFormData} />

          {/* City, Zip Code */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <select
                id="city"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.city}
                onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                required
              >
                <option value="">Select a city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <InputField label="Zip Code" id="zipCode" value={formData.zipCode} setFormData={setFormData} />
          </div>

          {/* Username, Password */}
          <InputField label="Username" id="username" value={formData.username} setFormData={setFormData} />
          <InputField label="Password" id="password" type="password" value={formData.password} setFormData={setFormData} />
          <p className="mt-1 text-sm text-gray-500">
            Must be at least 10 characters with uppercase, lowercase, and numbers
          </p>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

// Reusable input component
const InputField = ({ label, id, type = 'text', value, setFormData }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      id={id}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      value={value}
      onChange={(e) => setFormData((prev) => ({ ...prev, [id]: e.target.value }))}
      required
    />
  </div>
);

export default Register;
