"use client";

import { useState } from "react";


export default function DemoCredentials() {
  const [showUserDemo, setShowUserDemo] = useState(false);
  const [showAdminDemo, setShowAdminDemo] = useState(false);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-gray-900 p-5">
          <h3 className="mb-3 text-xl font-semibold">User Account</h3>

          <p>Email: demo@citylens.com</p>

          {!showUserDemo ? (
            <button
              onClick={() => setShowUserDemo(true)}
              className="mt-3 rounded-lg bg-white px-4 py-2 text-black"
            >
              Show Credentials
            </button>
          ) : (
            <p className="mt-3">Password: Demo@123</p>
          )}
        </div>
        {/* admin card */}
        <div className="rounded-xl bg-gray-900 p-5">
          <h3 className="mb-3 text-xl font-semibold">Admin Account</h3>

          <p>Email: admin@citylens.com</p>

          {!showAdminDemo ? (
            <button
              onClick={() => setShowAdminDemo(true)}
              className="mt-3 rounded-lg bg-white px-4 py-2 text-black"
            >
              Show Credentials
            </button>
          ) : (
            <p className="mt-3">Password: Admin@123</p>
          )}
        </div>
      </div>
    </>
  );
}
