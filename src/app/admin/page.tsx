"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import AdminCharts from "@/components/AdminCharts";

import {
  FileWarning,
  Clock3,
  CheckCircle2,
  XCircle,
  Shield,
} from "lucide-react";

export default function AdminPage() {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    async function init() {
      const userRes = await fetch("/api/auth/me");

      const userData = await userRes.json();

      if (userData.user?.role !== "ADMIN") {
        window.location.href = "/dashboard/user";

        return;
      }

      const issuesRes = await fetch("/api/issues");

      const issuesData = await issuesRes.json();

      setIssues(issuesData.issues || []);

      const analyticsRes = await fetch("/api/admin/analytics");

      const analyticsData = await analyticsRes.json();

      setAnalytics(analyticsData);

      setLoading(false);
    }

    init();
  }, []);

  async function deleteIssue(issueId: string) {
    const confirmed = confirm("Delete this issue?");

    if (!confirmed) return;

    const res = await fetch("/api/issues/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        issueId,
      }),
    });

    const data = await res.json();

    alert(data.message || data.error);

    location.reload();
  }
  function StatCard({ title, value, icon, color }: any) {
    return (
      <div
        className="
      rounded-3xl
      border
      border-[#1F2937]
      bg-[#111827]
      p-5
      shadow-lg
    "
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">{title}</p>

            <h2
              className={`
            mt-2
            text-3xl
            font-bold
            ${color}
          `}
            >
              {value}
            </h2>
          </div>

          <div className={color}>{icon}</div>
        </div>
      </div>
    );
  }

  async function updateStatus(issueId: string, status: string) {
    const res = await fetch("/api/issues/update-status", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        issueId,
        status,
      }),
    });

    const data = await res.json();

    alert(data.message || data.error);

    location.reload();
  }

  if (loading) {
    return <div className="p-10 text-white">Loading...</div>;
  }

  const totalIssues = issues.length;

  const pendingIssues = issues.filter((i) => i.status === "PENDING").length;

  const inProgressIssues = issues.filter(
    (i) => i.status === "IN_PROGRESS",
  ).length;

  const resolvedIssues = issues.filter((i) => i.status === "RESOLVED").length;

  const rejectedIssues = issues.filter((i) => i.status === "REJECTED").length;

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
          <div className="flex items-center gap-3">
            <Shield className="text-blue-400" size={32} />

            <h1
              className="
              text-3xl
              font-bold
              text-white
              md:text-4xl
            "
            >
              Admin Dashboard
            </h1>
          </div>

          <p className="mt-2 text-gray-400">
            Manage reports, analytics and issue resolution.
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
        mb-8
        grid
        gap-4
        sm:grid-cols-2
        xl:grid-cols-5
      "
      >
        <StatCard
          title="Total Issues"
          value={totalIssues}
          icon={<FileWarning />}
          color="text-blue-400"
        />

        <StatCard
          title="Pending"
          value={pendingIssues}
          icon={<Clock3 />}
          color="text-yellow-400"
        />

        <StatCard
          title="In Progress"
          value={inProgressIssues}
          icon={<Clock3 />}
          color="text-blue-400"
        />

        <StatCard
          title="Resolved"
          value={resolvedIssues}
          icon={<CheckCircle2 />}
          color="text-green-400"
        />

        <StatCard
          title="Rejected"
          value={rejectedIssues}
          icon={<XCircle />}
          color="text-red-400"
        />
      </div>

      {analytics && (
        <div
          className="
          mb-8
          grid
          gap-6
          lg:grid-cols-2
        "
        >
          <AdminCharts
            title="Status Distribution"
            data={analytics.statusData}
          />

          <AdminCharts
            title="Category Distribution"
            data={analytics.categoryData}
          />
        </div>
      )}

      <h2
        className="
        mb-4
        text-2xl
        font-semibold
        text-white
      "
      >
        Reported Issues
      </h2>

      <div
        className="
  grid
  gap-6
  md:grid-cols-2
  xl:grid-cols-3
"
      >
        {issues.map((issue: any) => (
          <div
            key={issue._id?.toString()}
            className="
        overflow-hidden
        rounded-3xl
        border
        border-[#1F2937]
        bg-[#111827]
        shadow-lg
        transition
        hover:border-blue-500
        hover:shadow-xl
      "
          >
            {issue.imageUrl && (
              <img
                src={issue.imageUrl}
                alt={issue.title}
                className="
            h-48
            w-full
            object-cover
          "
              />
            )}

            <div className="p-5">
  <div className="mb-4 flex flex-wrap gap-2">
    <span
      className="
      rounded-full
      bg-blue-500/10
      px-3
      py-1
      text-xs
      font-medium
      text-blue-400
    "
    >
      {issue.category}
    </span>

    <span
      className="
      rounded-full
      bg-yellow-500/10
      px-3
      py-1
      text-xs
      font-medium
      text-yellow-400
    "
    >
      {issue.priority}
    </span>
  </div>

  <h3 className="text-xl font-semibold text-white">
    {issue.title}
  </h3>

  <div className="mt-4 space-y-2">
    <p className="text-sm text-gray-400">
      📍 {issue.location || "Location not provided"}
    </p>

    <p className="text-sm text-gray-500">
      Department: {issue.department || "N/A"}
    </p>
  </div>

  <div className="mt-5">
    <span
      className={`
      rounded-full
      px-3
      py-1
      text-xs
      font-semibold
      ${
        issue.status === "RESOLVED"
          ? "bg-green-500/10 text-green-400"
          : issue.status === "IN_PROGRESS"
          ? "bg-blue-500/10 text-blue-400"
          : issue.status === "REJECTED"
          ? "bg-red-500/10 text-red-400"
          : "bg-yellow-500/10 text-yellow-400"
      }
    `}
    >
      {issue.status.replace("_", " ")}
    </span>
  </div>

  <div className="relative mt-5">
    <select
      className="
      w-full
      appearance-none
      rounded-xl
      border
      border-[#374151]
      bg-[#0F172A]
      p-3
      pr-12
      text-white
      focus:border-blue-500
      focus:outline-none
    "
      defaultValue={issue.status}
      onChange={(e) =>
        updateStatus(
          issue._id.toString(),
          e.target.value
        )
      }
    >
      <option>PENDING</option>
      <option>IN_PROGRESS</option>
      <option>RESOLVED</option>
      <option>REJECTED</option>
    </select>

    <ChevronDown
      size={18}
      className="
      pointer-events-none
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      text-gray-400
    "
    />
  </div>

  <button
    onClick={() =>
      deleteIssue(issue._id.toString())
    }
    className="
    mt-5
    w-full
    rounded-xl
    bg-red-600
    py-3
    font-medium
    text-white
    transition
    hover:bg-red-700
  "
  >
    Delete Issue
  </button>
</div>
          </div>
        ))}
      </div>
    </div>
  );
}
