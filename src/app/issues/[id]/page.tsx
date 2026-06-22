import UpvoteButton from "@/components/UpvoteButton";
import Link from "next/link";

import { headers } from "next/headers";

async function getIssue(id: string) {
  const headersList = await headers();

  const host = headersList.get("host");

  const protocol =
    process.env.NODE_ENV === "development"
      ? "http"
      : "https";

  const res = await fetch(
    `${protocol}://${host}/api/issues/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function IssueDetails({
  params,
}: any) {
  const { id } = await params;

  const data = await getIssue(id);

  if (!data.issue) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div
          className="
          rounded-3xl
          border
          border-[#1F2937]
          bg-[#111827]
          p-10
        "
        >
          Issue not found
        </div>
      </div>
    );
  }

  const issue = data.issue;

  const statusColors: any = {
    PENDING:
      "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",

    IN_PROGRESS:
      "bg-blue-500/15 text-blue-400 border border-blue-500/30",

    RESOLVED:
      "bg-green-500/15 text-green-400 border border-green-500/30",

    REJECTED:
      "bg-red-500/15 text-red-400 border border-red-500/30",
  };

  const priorityColors: any = {
    LOW:
      "bg-green-500/15 text-green-400 border border-green-500/30",

    MEDIUM:
      "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",

    HIGH:
      "bg-red-500/15 text-red-400 border border-red-500/30",
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
      <div className="mb-6">
  <Link
    href="/issues"
    className="
      inline-flex
      items-center
      rounded-xl
      border
      border-[#1F2937]
      bg-[#111827]
      px-4
      py-2
      text-white
      transition
      hover:border-blue-500
      hover:text-blue-400
    "
  >
    ← Back to Issues
  </Link>
</div>
      <div className="grid gap-8 lg:grid-cols-3 ">
        <div className="lg:col-span-2">
          <img
            src={issue.imageUrl}
            alt={issue.title}
            className="
              h-75
              w-full
              rounded-3xl
              object-cover
              md:h-112.5
            "
          />

          <div
            className="
            mt-6
            rounded-3xl
            border
            border-[#1F2937]
            bg-[#111827]
            p-6
          "
          >
            <div className="mb-4 flex flex-wrap gap-2">
              <span
                className={`
                rounded-full
                px-3
                py-1
                text-xs
                font-medium
                ${statusColors[issue.status]}
              `}
              >
                {issue.status}
              </span>

              <span
                className={`
                rounded-full
                px-3
                py-1
                text-xs
                font-medium
                ${priorityColors[issue.priority]}
              `}
              >
                {issue.priority}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-white md:text-4xl">
              {issue.title}
            </h1>

            <p className="mt-6 leading-7 text-gray-300">
              {issue.description}
            </p>

            <div className="mt-6">
              <UpvoteButton
                issueId={issue._id.toString()}
                initialUpvotes={
                  issue.upvotes || 0
                }
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div
            className="
            rounded-3xl
            border
            border-[#1F2937]
            bg-[#111827]
            p-6
          "
          >
            <h2 className="mb-4 text-xl font-semibold text-white">
              Issue Details
            </h2>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-500">
                  Category
                </p>

                <p className="text-white">
                  {issue.category}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Department
                </p>

                <p className="text-white">
                  {issue.department ||
                    "N/A"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Location
                </p>

                <p className="text-white">
                  {issue.location}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Created
                </p>

                <p className="text-white">
                  {new Date(
                    issue.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div
            className="
            rounded-3xl
            border
            border-[#1F2937]
            bg-[#111827]
            p-6
          "
          >
            <h2 className="mb-4 text-xl font-semibold text-white">
              Status Timeline
            </h2>

            <div className="space-y-4">
              {issue.history?.length >
              0 ? (
                issue.history.map(
                  (
                    item: any,
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="
                      border-l-2
                      border-blue-500
                      pl-4
                    "
                    >
                      <p className="font-medium text-white">
                        {item.status}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(
                          item.updatedAt
                        ).toLocaleString()}
                      </p>
                    </div>
                  )
                )
              ) : (
                <p className="text-gray-500">
                  No timeline
                  available.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

