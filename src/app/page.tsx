import Link from "next/link";
import DemoCredentials from "@/components/DemoCredentials";

export default function HomePage() {
  return (
    <main
      className="
  min-h-screen
  bg-linear-to-b
  from-[#020617]
  via-[#0F172A]
  to-[#020617]
  text-white
"
    >
      {/* Hero Section */}

      <section
        className="
  relative
  mx-auto
  flex
  max-w-6xl
  flex-col
  items-center
  px-6
  py-8
  text-center
"
      >
        <h1
          className="
  mb-6
  text-6xl
  font-extrabold
  tracking-tight
  md:text-8xl
"
        >
          CityLens
        </h1>

        <p className="max-w-3xl text-md text-gray-400">
          Community-driven civic issue reporting platform. Report, track and
          monitor issues like potholes, garbage accumulation, water supply
          problems, streetlight failures and more.
        </p>
        <div
          className="
  mt-8
  mb-6
  h-1
  w-full
  rounded-full
  bg-blue-500
"
        ></div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Project Highlights
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div
            className="rounded-3xl
border
border-[#1F2937]
bg-[#111827]
p-6
shadow-lg
transition
hover:-translate-y-1
hover:border-blue-500
hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
          >
            <h3 className="mb-2 text-xl font-semibold">
              📍 Interactive Issue Map
            </h3>

            <p className="text-gray-400">
              Visualize reported issues directly on a city map using Leaflet.
            </p>
          </div>

          <div
            className="rounded-3xl
border
border-[#1F2937]
bg-[#111827]
p-6
shadow-lg
transition
hover:-translate-y-1
hover:border-blue-500
hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
          >
            <h3 className="mb-2 text-xl font-semibold">
              🔔 Real-Time Notifications
            </h3>

            <p className="text-gray-400">
              Users receive updates whenever issue status changes.
            </p>
          </div>

          <div
            className="rounded-3xl
border
border-[#1F2937]
bg-[#111827]
p-6
shadow-lg
transition
hover:-translate-y-1
hover:border-blue-500
hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
          >
            <h3 className="mb-2 text-xl font-semibold">
              📊 Admin Analytics Dashboard
            </h3>

            <p className="text-gray-400">
              Monitor issue distribution and resolution progress.
            </p>
          </div>

          <div
            className="rounded-3xl
border
border-[#1F2937]
bg-[#111827]
p-6
shadow-lg
transition
hover:-translate-y-1
hover:border-blue-500
hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
          >
            <h3 className="mb-2 text-xl font-semibold">
              🕒 Issue Timeline Tracking
            </h3>

            <p className="text-gray-400">
              Track every status update from report creation to resolution.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Explore CityLens
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div
            className="rounded-3xl
border
border-[#1F2937]
bg-[#111827]
p-6
shadow-lg"
          >
            <h3 className="mb-4 text-2xl font-bold">👤 User Journey</h3>

            <ul className="space-y-2 text-gray-400 px-12">
              <li>1. Login as Demo User</li>
              <li>2. Report a New Issue</li>
              <li>3. Upload Evidence Image</li>
              <li>4. Select Location on Map</li>
              <li>5. Track Notifications</li>
            </ul>
          </div>

          <div
            className="rounded-3xl
border
border-[#1F2937]
bg-[#111827]
p-6
shadow-lg "
          >
            <h3 className="mb-4 text-2xl font-bold ">🛠 Admin Journey</h3>

            <ul className="space-y-2 text-gray-400 px-12">
              <li>1. Login as Admin</li>
              <li>2. Open Dashboard</li>
              <li>3. Review Reported Issues</li>
              <li>4. Update Status</li>
              <li>5. View Analytics</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pt-16 pb-2">
        <div
          className="rounded-3xl
border
border-[#1F2937]
bg-[#111827]
p-8
shadow-[0_0_40px_rgba(59,130,246,0.12)]"
        >
          <h2 className="mb-6 text-center text-3xl font-bold">Demo Access</h2>
          <p className="mb-6 text-center text-gray-400">
            Use the demo accounts below to explore both user and administrator
            workflows.
          </p>

          <DemoCredentials />
        </div>
      </section>

      <section className="py-16 text-center">
        <h2 className="mb-6 text-4xl font-bold">Ready to Explore CityLens?</h2>

        <div className="flex justify-center gap-4">
          <Link
            href="/login"
            className="
rounded-xl
bg-blue-600
px-8
py-3
font-medium
text-white
transition
hover:bg-blue-700
"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="
rounded-xl
bg-blue-600
px-8
py-3
font-medium
text-white
transition
hover:bg-blue-700
"
          >
            Register
          </Link>
        </div>
      </section>

      <section className="py-10">
        <h2 className="mb-6 text-center text-3xl font-bold">Built With</h2>

        <div className="flex flex-wrap justify-center gap-3">
          {[
            "Next.js",
            "TypeScript",
            "MongoDB",
            "JWT",
            "Cloudinary",
            "Leaflet",
            "TailwindCSS",
            "Recharts",
          ].map((tech) => (
            <span
              key={tech}
              className="
        rounded-full
border
border-blue-500/20
bg-blue-500/10
        px-4
        py-2
        text-sm
        "
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
