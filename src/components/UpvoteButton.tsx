"use client";

import { useState } from "react";


export default function UpvoteButton({
  issueId,
  initialUpvotes,
}: {
  issueId: string;
  initialUpvotes: number;
}) {
  const [count, setCount] = useState(initialUpvotes);

  async function upvote() {
    const res = await fetch("/api/issues/upvote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        issueId,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return alert(data.error);
    }

    setCount(data.upvotes);
  }

  return (
    <button
      onClick={upvote}
      className="
flex
items-center
gap-2
rounded-xl
border
border-blue-500/30
bg-blue-500/10
px-4
py-2
text-blue-400
transition
hover:bg-blue-500/20
hover:text-blue-300
"
    >
      👍 {count}
    </button>
  );
}
