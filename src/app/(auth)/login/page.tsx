"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// flow--
// User opens /login
//           ↓
// Fills email & password
//           ↓
// Clicks Login button
//           ↓
// fetch("/api/login")
//           ↓
// Backend route executes
//           ↓
// Checks user exists
//           ↓
// bcrypt.compare()
//           ↓
// Creates JWT
//           ↓
// Sets cookie
//           ↓
// Returns success
//           ↓
// Redirect to dashboard

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        return alert(data.error);
      }

      alert("Login Success");

      router.push("/dashboard/user");
    } catch {
      alert("Login Failed");
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
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-white">CityLens</h1>

          <p className="mt-1 mb-3 text-sm text-gray-400">
            Civic Issue Reporting Platform
          </p>
        </div>
        <h2 className="mb-4 text-center text-2xl font-semibold text-white">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="mb-2 block text-sm text-gray-300">
            Email Address
          </label>
          <input
            placeholder="Email"
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

          <label className="mb-2 block text-sm text-gray-300">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="
      w-full
      rounded-xl
      border
      border-[#374151]
      bg-[#0F172A]
      p-3
      pr-12
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

          <button
            disabled={loading}
            className="
w-full
rounded-xl
bg-blue-600
py-3
font-medium
text-white

hover:bg-blue-700
disabled:opacity-50
hover:scale-[1.02]
transition-all
duration-200
"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 rounded-xl border border-[#1F2937] bg-[#0F172A] p-4">
  <button
    type="button"
    onClick={() => setShowDemo(!showDemo)}
    className="flex w-full items-center justify-between"
  >
    <span className="font-semibold">
      🧪 Demo Access
    </span>

    <span>
      {showDemo ? "▲" : "▼"}
    </span>
  </button>

  {showDemo && (
    <div className="mt-4 space-y-2 text-gray-400">
      <p>Email: admin@citylens.com</p>
      <p>Password: Admin@123</p>
    </div>
  )}
</div>

        <p className="mt-4 text-center text-zinc-400">
          Don't have an account?{" "}
          <Link href="/register" className="text-white"> Register
          </Link>
        </p>
      </div>
    </main>
  );
}
