"use client"

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {

  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuthenticated = sessionStorage.getItem("isAuthenticated");
      const userDataString = sessionStorage.getItem('user');

      console.log('isAuthenticated:', isAuthenticated);
      console.log('userDataString:', userDataString);

      if (userDataString) {
        const userData = JSON.parse(userDataString);
        console.log('userData:', userData);

        setAuthenticated(isAuthenticated);
        setUser(userData);
      }
    }
  }, []);

  const logout = () => {
    sessionStorage.setItem("isAuthenticated", false);
    sessionStorage.removeItem("user");
    setAuthenticated(false);
    setUser(null);
  }

  return (
    // <main className="flex min-h-screen justify-content-center align-items-center">
    //   <div>
    //     <nav>
    //       <ul>
    //         <li>
    //           <Link href="/pages/register">
    //             <p>Register</p>
    //           </Link>
    //         </li>
    //         <li>
    //           <Link href="/pages/login">
    //             <p>Login</p>
    //           </Link>
    //         </li>
    //         <li>
    //           <Link href="/pages/home">
    //             <p>Home</p>
    //           </Link>
    //         </li>
    //       </ul>
    //     </nav>
    //   </div>
    // </main>
    <main className="flex flex-col w-screen h-screen justify-center items-center text-center">
      <h1 className="text-9xl mb-4">Home</h1>
      {!authenticated &&
        <div>
          <p className="text-2xl mb-3">You need to Log in first.</p>
          <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded drop-shadow-lg tracking-wider text-xl">
            <Link href="/pages/login">
              Login
            </Link>
          </button>
        </div>
      }
      {authenticated &&
        <div>
          <p className="text-2xl mb-3">You finally made it, {user.username}!</p>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded drop-shadow-lg tracking-wider text-xl"
            onClick={logout}>
            Logout
          </button>
        </div>
      }
    </main>
  )
}
