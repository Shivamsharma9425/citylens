"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

import {
  Bell,
  CheckCircle2,
} from "lucide-react";

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      await fetch(
        "/api/notifications/read",
        {
          method: "PATCH",
        }
      );

      const res = await fetch(
        "/api/notifications"
      );

      const data =
        await res.json();

      setNotifications(
        data.notifications || []
      );

      setLoading(false);
    }

    load();
  }, []);

  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-5xl px-4 py-6 md:px-6">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <Bell
              size={32}
              className="text-blue-400"
            />

            <h1 className="text-3xl font-bold text-white md:text-4xl">
              Notifications
            </h1>
          </div>

          <p className="mt-2 text-gray-400">
            Track updates on your
            reported issues.
          </p>
        </div>

        {loading ? (
          <div className="text-gray-400">
            Loading...
          </div>
        ) : notifications.length ===
          0 ? (
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
            <Bell
              size={50}
              className="
                mx-auto
                mb-4
                text-gray-500
              "
            />

            <h2 className="text-xl font-semibold text-white">
              No Notifications
            </h2>

            <p className="mt-2 text-gray-400">
              You're all caught up.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map(
              (n) => (
                <div
                  key={n._id}
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
                  <div className="flex items-start gap-4">
                    <div
                      className="
                      rounded-full
                      bg-green-500/10
                      p-2
                    "
                    >
                      <CheckCircle2
                        size={18}
                        className="text-green-400"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="text-white">
                        {n.message}
                      </p>

                      <p
                        className="
                        mt-2
                        text-sm
                        text-gray-500
                      "
                      >
                        {new Date(
                          n.createdAt
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
}

