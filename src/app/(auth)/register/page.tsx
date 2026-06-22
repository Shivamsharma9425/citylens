"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");

      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);

        return;
      }

      alert("Account created successfully");

      window.location.href = "/issues";
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#030712] px-4">
      <div
        className="
        shadow-[0_0_30px_rgba(37,99,235,0.15)]
        w-full
        max-w-md
        rounded-3xl
        border
        border-[#1F2937]
        bg-[#111827]
        p-8
        
      "
      >
        <div className="mb-6 text-center">
          <h1 className="text-5xl font-bold text-white">CityLens</h1>

          <p className="mt-1 text-gray-400">Civic Issue Reporting Platform</p>
        </div>

        <h2
          className="
          mb-6
          text-center
          text-2xl
          font-semibold
          text-white
        "
        >
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="
              mb-2
              block
              text-sm
              text-gray-300
            "
            >
              Full Name
            </label>

            <input
              placeholder="Enter your name"
              className="
                w-full
                rounded-xl
                border
                border-[#374151]
                bg-[#0F172A]
                p-3
                text-white
                placeholder:text-gray-500
                focus:border-blue-500
                focus:outline-none
              "
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label
              className="
              mb-2
              block
              text-sm
              text-gray-300
            "
            >
              Email Address
            </label>

            <input
              placeholder="Enter your email"
              className="
                w-full
                rounded-xl
                border
                border-[#374151]
                bg-[#0F172A]
                p-3
                text-white
                placeholder:text-gray-500
                focus:border-blue-500
                focus:outline-none
              "
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label
              className="
              mb-2
              block
              text-sm
              text-gray-300
            "
            >
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#374151]
                  bg-[#0F172A]
                  p-3
                  pr-14
                  text-white
                  placeholder:text-gray-500
                  focus:border-blue-500
                  focus:outline-none
                "
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-sm
                  text-gray-400
                  hover:text-white
                "
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <p className="mt-2 text-xs text-gray-500">
              Minimum 6 characters.
            </p>
          </div>

          <div>
            <label
              className="
              mb-2
              block
              text-sm
              text-gray-300
            "
            >
              Confirm Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="
                w-full
                rounded-xl
                border
                border-[#374151]
                bg-[#0F172A]
                p-3
                text-white
                placeholder:text-gray-500
                focus:border-blue-500
                focus:outline-none
              "
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>

          <button
            disabled={loading}
            className="
              w-full
              rounded-xl
              bg-blue-600
              py-3
              font-medium
              text-white
              transition-all
              duration-200
              hover:scale-[1.02]
              hover:bg-blue-700
              disabled:opacity-50
            "
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="
              font-medium
              text-white
              hover:text-blue-400
            "
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
