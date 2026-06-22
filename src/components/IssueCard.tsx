
import Link from "next/link";
import {
  MapPin,
  ThumbsUp,
  AlertTriangle,
} from "lucide-react";

type Props = {
  id: string;
  title: string;
  category: string;
  department: string;
  status: string;
  priority: string;
  imageUrl?: string;
  upvotes?: number;
  location: string;
};

export default function IssueCard({
  id,
  title,
  category,
  department,
  status,
  priority,
  imageUrl,
  upvotes,
  location,
}: Props) {
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
    <Link href={`/issues/${id}`}>
      <div
        className="
        group
        cursor-pointer
        overflow-hidden
        rounded-3xl
        border
        border-[#1F2937]
        bg-[#111827]
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-500
        hover:shadow-2xl
      "
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="
              h-52
              w-full
              object-cover
              transition
              duration-500
              group-hover:scale-105
            "
          />
        ) : (
          <div
            className="
            flex
            h-52
            items-center
            justify-center
            bg-[#0F172A]
          "
          >
            <AlertTriangle
              size={48}
              className="text-gray-600"
            />
          </div>
        )}

        <div className="p-5">
          <div className="mb-3 flex flex-wrap gap-2">
            <span
              className={`
                rounded-full
                px-3
                py-1
                text-xs
                font-medium
                ${statusColors[status]}
              `}
            >
              {status}
            </span>

            <span
              className={`
                rounded-full
                px-3
                py-1
                text-xs
                font-medium
                ${priorityColors[priority]}
              `}
            >
              {priority}
            </span>
          </div>

          <h3
            className="
            line-clamp-2
            text-lg
            font-semibold
            text-white
          "
          >
            {title}
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            {category}
          </p>

          <div
            className="
            mt-4
            flex
            items-center
            gap-2
            text-sm
            text-gray-400
          "
          >
            <MapPin size={16} />

            <span className="line-clamp-1">
              {location}
            </span>
          </div>

          <div
            className="
            mt-5
            flex
            items-center
            justify-between
          "
          >
            <div
              className="
              flex
              items-center
              gap-2
              text-blue-400
            "
            >
              <ThumbsUp size={18} />

              <span className="font-medium">
                {upvotes || 0}
              </span>
            </div>

            <span
              className="
              text-sm
              font-medium
              text-blue-400
              transition
              group-hover:text-blue-300
            "
            >
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

