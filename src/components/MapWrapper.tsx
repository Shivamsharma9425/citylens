"use client";

import dynamic from "next/dynamic";

const IssueMap = dynamic(() => import("./IssueMap"), {
  ssr: false,
});

export default function MapWrapper({ issues }: { issues: any[] }) {
  return <IssueMap issues={issues} />;
}
