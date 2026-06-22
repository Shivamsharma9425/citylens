type Props = {
  title: string;
  value: number;
};

export default function StatsCard({
  title,
  value,
}: Props) {
  return (
    <div
      className="
      rounded-3xl
      border
      border-[#1F2937]
      bg-[#111827]
      p-5
      shadow-lg
      transition
      hover:border-blue-500
    "
    >
      <p className="text-sm text-gray-400">
        {title}
      </p>

      <h2
        className="
        mt-2
        text-3xl
        font-bold
        text-white
      "
      >
        {value}
      </h2>
    </div>
  );
}