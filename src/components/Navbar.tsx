"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function getUser() {
      const res = await fetch("/api/auth/me");

      if (!res.ok) return;

      const data = await res.json();

      setUser(data.user);

      const countRes = await fetch("/api/notifications/count");

      const countData = await countRes.json();

      setUnreadCount(countData.count);
    }

    getUser();
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    window.location.href = "/login";
  }

  return (
    <nav
      className="
  sticky
  top-0
  z-50
  border-b
  border-[#1F2937]
  bg-[#030712]/95
  backdrop-blur
"
    >
      <div
        className="
    mx-auto
    flex
    max-w-7xl
    items-center
    justify-between
    px-6
    py-4
  "
      >
        {/* Logo Always Visible */}
        <Link
          href="/"
          className="
      text-2xl
      font-bold
      text-white
      transition
      hover:text-blue-400
    "
        >
          CityLens
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div
          className="
      hidden
      md:flex
      items-center
      gap-6
      text-sm
      font-medium
    "
        >
          <Link href="/report" className="text-gray-300 hover:text-white">
            Report
          </Link>

          <Link href="/issues" className="text-gray-300 hover:text-white">
            Issues
          </Link>

          <Link href="/map" className="text-gray-300 hover:text-white">
            Map
          </Link>

          <Link
            href="/dashboard/user"
            className="text-gray-300 hover:text-white"
          >
            Dashboard
          </Link>

          {user?.role !== "ADMIN" && (
            <Link
              href="/notifications"
              className="relative text-gray-300 hover:text-white"
            >
              <div className="flex items-center gap-1.5">
                <Bell size={18} />
                <span>Notifications</span>
              </div>

              {unreadCount > 0 && (
                <span
                  className="
              absolute
              -right-4
              -top-2
              flex
              h-5
              min-w-5
              items-center
              justify-center
              rounded-full
              bg-red-500
              px-1
              text-[10px]
              font-bold
              text-white
            "
                >
                  {unreadCount}
                </span>
              )}
            </Link>
          )}

          {user?.role === "ADMIN" && (
            <Link
              href="/admin"
              className="
          rounded-xl
          bg-blue-600
          px-4
          py-2
          text-white
          hover:bg-blue-700
        "
            >
              Admin
            </Link>
          )}

          <button
            onClick={logout}
            className="
        rounded-xl
        bg-red-600
        px-4
        py-2
        text-white
        hover:bg-red-700
      "
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div
          className="
      md:hidden
      border-t
      border-[#1F2937]
      bg-[#030712]
    "
        >
          <div className="flex flex-col p-4">
            <Link href="/report" className="py-3">
              Report
            </Link>

            <Link href="/issues" className="py-3">
              Issues
            </Link>

            <Link href="/map" className="py-3">
              Map
            </Link>

            <Link href="/dashboard/user" className="py-3">
              Dashboard
            </Link>

            {user?.role !== "ADMIN" && (
              <Link href="/notifications" className="py-3">
                Notifications
              </Link>
            )}

            {user?.role === "ADMIN" && (
              <Link href="/admin" className="py-3">
                Admin
              </Link>
            )}

            <button
              onClick={logout}
              className="
          mt-3
          rounded-xl
          bg-red-600
          py-2
          text-white
        "
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
