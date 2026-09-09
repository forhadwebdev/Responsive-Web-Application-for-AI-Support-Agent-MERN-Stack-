"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between bg-white shadow-sm">
      <Link href="/" className="flex items-center gap-2 font-bold text-brand-600 text-lg">
        <span className="w-8 h-8 rounded-lg bg-brand-500 text-white flex items-center justify-center text-sm">
          SP
        </span>
        SupportPilot AI
      </Link>

      <div className="flex items-center gap-4 text-sm font-medium">
        {isLoggedIn ? (
          <>
            <Link href="/dashboard" className="text-gray-600 hover:text-brand-600">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-gray-600 hover:text-brand-600">
              Log In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-lg bg-brand-500 text-white hover:bg-brand-600"
            >
              Start Free
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
