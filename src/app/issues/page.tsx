"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import IssueCard from "@/components/IssueCard";

import { FileWarning } from "lucide-react";

export default function IssuesPage() {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getIssues() {
      const res = await fetch("/api/issues");

      const data = await res.json();

      setIssues(data.issues || []);

      setLoading(false);
    }

    getIssues();
  }, []);

  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Reported Issues
          </h1>

          <p className="mt-2 text-gray-400">
            Browse and track all issues reported
            across the city.
          </p>
        </div>

        {loading ? (
          <div className="text-gray-400">
            Loading issues...
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
            <FileWarning
              size={50}
              className="mx-auto mb-4 text-gray-500"
            />

            <h2 className="text-xl font-semibold text-white">
              No Issues Found
            </h2>

            <p className="mt-2 text-gray-400">
              No issues have been reported yet.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div
                className="
                inline-flex
                rounded-full
                border
                border-[#1F2937]
                bg-[#111827]
                px-4
                py-2
                text-sm
                text-gray-300
              "
              >
                Total Issues:{" "}
                <span className="ml-2 font-semibold text-white">
                  {issues.length}
                </span>
              </div>
            </div>

            <div
              className="
              grid
              gap-6
              sm:grid-cols-2
              xl:grid-cols-3
            "
            >
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
          </>
        )}
      </div>
    </>
  );
}

