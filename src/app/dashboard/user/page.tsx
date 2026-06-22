"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import StatsCard from "@/components/StatsCard";
import IssueCard from "@/components/IssueCard";

import {
  FileWarning,
  Clock3,
  CheckCircle2,
  ArrowBigUp,
} from "lucide-react";

export default function Dashboard() {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const res = await fetch("/api/issues/my");

      const data = await res.json();

      setIssues(data.issues || []);

      setLoading(false);
    }

    getData();
  }, []);

  const pending = issues.filter(
    (i: any) => i.status === "PENDING"
  ).length;

  const resolved = issues.filter(
    (i: any) => i.status === "RESOLVED"
  ).length;

  const totalUpvotes = issues.reduce(
    (acc: number, issue: any) =>
      acc + (issue.upvotes || 0),
    0
  );

  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-400">
            Manage and track your reported issues.
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
                <p className="text-sm text-gray-400">
                  Total Issues
                </p>

                <h2 className="mt-2 text-3xl font-bold text-white">
                  {issues.length}
                </h2>
              </div>

              <FileWarning
                size={28}
                className="text-blue-400"
              />
            </div>
          </div>

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
                <p className="text-sm text-gray-400">
                  Pending
                </p>

                <h2 className="mt-2 text-3xl font-bold text-yellow-400">
                  {pending}
                </h2>
              </div>

              <Clock3
                size={28}
                className="text-yellow-400"
              />
            </div>
          </div>

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
                <p className="text-sm text-gray-400">
                  Resolved
                </p>

                <h2 className="mt-2 text-3xl font-bold text-green-400">
                  {resolved}
                </h2>
              </div>

              <CheckCircle2
                size={28}
                className="text-green-400"
              />
            </div>
          </div>

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
                <p className="text-sm text-gray-400">
                  Total Upvotes
                </p>

                <h2 className="mt-2 text-3xl font-bold text-blue-400">
                  {totalUpvotes}
                </h2>
              </div>

              <ArrowBigUp
                size={28}
                className="text-blue-400"
              />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <h2 className="text-2xl font-semibold text-white">
            My Issues
          </h2>
        </div>

        {loading ? (
          <div className="text-gray-400">
            Loading...
          </div>
        ) : issues.length === 0 ? (
          <div
            className="
            rounded-3xl
            border
            border-[#1F2937]
            bg-[#111827]
            p-10
            text-center
          "
          >
            <h3 className="text-xl font-semibold text-white">
              No Issues Reported Yet
            </h3>

            <p className="mt-2 text-gray-400">
              Start contributing by reporting
              your first issue.
            </p>

            <a
              href="/report"
              className="
                mt-6
                inline-block
                rounded-xl
                bg-blue-600
                px-5
                py-3
                text-white
                transition
                hover:bg-blue-700
              "
            >
              Report Issue
            </a>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {issues.map((issue: any) => (
              <IssueCard
                key={issue._id}
                id={issue._id}
                title={issue.title}
                category={issue.category}
                department={issue.department}
                status={issue.status}
                priority={issue.priority}
                imageUrl={issue.imageUrl}
                upvotes={issue.upvotes}
                location={issue.location}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

