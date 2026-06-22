import { connectDB } from "@/lib/mongodb";
import Issue from "@/models/Issue";
import Link from "next/link";

import MapWrapper from "@/components/MapWrapper";

export default async function MapPage() {
  await connectDB();

  const issues = await Issue.find();

  const totalIssues = issues.length;

  const pendingIssues = issues.filter(
    (i) => i.status === "PENDING"
  ).length;

  const resolvedIssues = issues.filter(
    (i) => i.status === "RESOLVED"
  ).length;

  const inProgressIssues = issues.filter(
    (i) => i.status === "IN_PROGRESS"
  ).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
      <div
        className="
        mb-8
        flex
        flex-col
        gap-4
        md:flex-row
        md:items-center
        md:justify-between
      "
      >
        <div>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            City Issues Map
          </h1>

          <p className="mt-2 text-gray-400">
            Explore reported issues across the city.
          </p>
        </div>

        <Link
          href="/issues"
          className="
          w-fit
          rounded-xl
          border
          border-[#1F2937]
          bg-[#111827]
          px-4
          py-2
          text-white
          transition
          hover:border-blue-500
        "
        >
          ← Back to Issues
        </Link>
      </div>

      <div
        className="
        mb-6
        grid
        gap-4
        sm:grid-cols-2
        lg:grid-cols-4
      "
      >
        <div
          className="
          rounded-3xl
          border
          border-[#1F2937]
          bg-[#111827]
          p-5
        "
        >
          <p className="text-sm text-gray-400">
            Total Issues
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-400">
            {totalIssues}
          </h2>
        </div>

        <div
          className="
          rounded-3xl
          border
          border-[#1F2937]
          bg-[#111827]
          p-5
        "
        >
          <p className="text-sm text-gray-400">
            Pending
          </p>

          <h2 className="mt-2 text-3xl font-bold text-yellow-400">
            {pendingIssues}
          </h2>
        </div>

        <div
          className="
          rounded-3xl
          border
          border-[#1F2937]
          bg-[#111827]
          p-5
        "
        >
          <p className="text-sm text-gray-400">
            In Progress
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-400">
            {inProgressIssues}
          </h2>
        </div>

        <div
          className="
          rounded-3xl
          border
          border-[#1F2937]
          bg-[#111827]
          p-5
        "
        >
          <p className="text-sm text-gray-400">
            Resolved
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-400">
            {resolvedIssues}
          </h2>
        </div>
      </div>

      <div
        className="
        overflow-hidden
        rounded-3xl
        border
        border-[#1F2937]
        bg-[#111827]
        p-3
        shadow-[0_0_40px_rgba(59,130,246,0.12)]
      "
      >
        <MapWrapper
          issues={JSON.parse(
            JSON.stringify(issues)
          )}
        />
      </div>
    </div>
  );
}
