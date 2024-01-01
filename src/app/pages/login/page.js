"use client"

// pages/login.js
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@/app/utils/alert';
import { Login } from '@/app/lib/definition';
import { verifyLogin } from '@/app/lib/data';
import Link from 'next/link';

export default function Page() {
  const initialFormData = {
    email: '',
    password: '',
    token: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertId, setAlertId] = useState(0);
  const router = useRouter();

  const resetForm = () => {
    setFormData(initialFormData);
  };

  // Function to handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleResponse = (response) => {
    if (response == "Something Went Wrong! Please Try Again Later.") {
      setAlertType("error");
      setAlertMessage(response);
    } else if (typeof response === 'object') {
      setAlertType("success");
      setAlertMessage(response.message);
    } else {
      setAlertType("success");
      setAlertMessage(response);
    }

    setAlertId((prevId) => prevId + 1);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['email', 'password', 'token'];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setAlertType("warning");
      setAlertMessage(`Please fill out all required fields: ${missingFields.join(', ')}`);
      setAlertId((prevId) => prevId + 1);
      return;
    }

    try {
      const login = new Login(
        formData.email,
        formData.password,
        formData.token
      );

      const loginRes = await verifyLogin(login);
      sessionStorage.setItem('user', JSON.stringify(loginRes.user));
      sessionStorage.setItem('isAuthenticated', true);
      handleResponse(loginRes);

      if (loginRes.message === "User Successfully Verified & Authenticated!") {
        resetForm();
        router.push(`/`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setAlertType("error");
      setAlertMessage("Something Went Wrong! Please Try Again Later.");
      setAlertId((prevId) => prevId + 1);
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center text-center">
      <div className="p-3 border-2 border-white w-1/2 h-3/4 flex justify-center items-center flex-col">
        <h1 className='text-5xl mb-2 uppercase font-black text-yellow-400'>Login</h1>
        <div className="login-form-container w-full h-100 p-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-12">
              <p className="mt-1 mb-3 text-md leading-6 text-gray-300">Please provide your email, password, and 2FA token to login.</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-white text-left">
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      autoComplete="email"
                      className="p-1 block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-white text-left">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      autoComplete="password"
                      className="p-1 block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="token" className="block text-sm font-medium leading-6 text-white text-left">
                    Token
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="token"
                      id="token"
                      value={formData.token}
                      onChange={handleInputChange}
                      autoComplete="token"
                      className="p-1 block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <button
                  type="submit"
                  className="rounded-md w-full h-14 bg-lime-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Authenticate Myself
                </button>
              </div>

              <div className="register-text">
                <Link href="/pages/register" className="text-sm italic text-gray-400 hover:text-orange-300">
                  Register a new account here.
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Alert alertId={alertId} alertType={alertType} message={alertMessage} />
    </div>
  );
};