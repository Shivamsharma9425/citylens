"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import LocationPickerWrapper from "@/components/LocationPickerWrapper";
import { ChevronDown } from "lucide-react";

import {
  ImageIcon,
  MapPin,
  FileText,
  AlertTriangle,
} from "lucide-react";

export default function ReportPage() {
  const [loading, setLoading] = useState(false);

  const [showMap, setShowMap] =
    useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Road",
    location: "",
  });

  const [selectedLocation, setSelectedLocation] =
    useState<{
      lat: number;
      lng: number;
    } | null>(null);

  const [file, setFile] =
    useState<File | null>(null);

  async function handleSubmit(
    e: any
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      let imageUrl = "";

      if (file) {
        const uploadData =
          new FormData();

        uploadData.append(
          "file",
          file
        );

        const uploadRes =
          await fetch(
            "/api/upload",
            {
              method: "POST",
              body: uploadData,
            }
          );

        const uploadJson =
          await uploadRes.json();

        imageUrl =
          uploadJson.imageUrl;
      }

      if (!selectedLocation) {
        alert(
          "Please select location on map"
        );

        return;
      }

      const res = await fetch(
        "/api/issues/create",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...form,
            imageUrl,
            latitude:
              selectedLocation.lat,
            longitude:
              selectedLocation.lng,
          }),
        }
      );

      const data =
        await res.json();

      alert(
        data.message ||
          data.error
      );

      setForm({
        title: "",
        description: "",
        category: "Road",
        location: "",
      });

      setFile(null);

      setSelectedLocation(
        null
      );
    } catch {
      alert("Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 py-6 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Report Issue
          </h1>

          <p className="mt-2 text-gray-400">
            Help improve your city
            by reporting civic
            issues.
          </p>
        </div>

        <div
  className="
  rounded-3xl
  border
  border-[#1F2937]
  bg-[#111827]
  p-6
  shadow-[0_0_40px_rgba(59,130,246,0.15)]
"
>
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label
                className="
                mb-2
                flex
                items-center
                gap-2
                text-sm
                font-medium
                text-gray-300
              "
              >
                <ImageIcon
                  size={16}
                />
                Upload Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFile(
                    e.target
                      .files?.[0] ||
                      null
                  )
                }
                className="
                w-full
                rounded-xl
                border
                border-[#374151]
                bg-[#0F172A]
                p-3
                text-gray-300
              "
              />
            </div>

            <div>
              <label
                className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-300
              "
              >
                Issue Title
              </label>

              <input
                className="
                w-full
                rounded-xl
                border
                border-[#374151]
                bg-[#0F172A]
                p-3
                text-white
                focus:border-blue-500
                focus:outline-none
              "
                placeholder="eg. Pothole near main gate"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title:
                      e.target
                        .value,
                  })
                }
              />
            </div>

            <div>
              <label
                className="
                mb-2
                flex
                items-center
                gap-2
                text-sm
                font-medium
                text-gray-300
              "
              >
                <FileText
                  size={16}
                />
                Description
              </label>

              <textarea
                rows={3}
                className="
                w-full
                rounded-xl
                border
                border-[#374151]
                bg-[#0F172A]
                p-3
                text-white
                focus:border-blue-500
                focus:outline-none
              "
                placeholder="Describe the issue..."
                value={
                  form.description
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    description:
                      e.target
                        .value,
                  })
                }
              />
            </div>

            <div>
  <label
    className="
      mb-2
      block
      text-sm
      font-medium
      text-gray-300
    "
  >
    Category
  </label>

  <div className="relative">
    <select
      className="
        w-full
        appearance-none
        rounded-xl
        border
        border-[#374151]
        bg-[#0F172A]
        p-3
        pr-10
        text-white
        focus:border-blue-500
        focus:outline-none
      "
      value={form.category}
      onChange={(e) =>
        setForm({
          ...form,
          category: e.target.value,
        })
      }
    >
      <option>Road</option>
      <option>Streetlight</option>
      <option>Garbage</option>
      <option>Water</option>
      <option>Electricity</option>
      <option>Other</option>
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
</div>

            <div
              className="
              rounded-2xl
              border
              border-[#1F2937]
              bg-[#0F172A]
              p-4
            "
            >
              <div
                className="
                flex
                flex-col
                gap-4
                md:flex-row
                md:items-center
                md:justify-between
              "
              >
                <div>
                  <h3 className="font-medium text-white">
                    Location
                  </h3>

                  <p className="text-sm text-gray-400">
                    Select issue
                    location on map
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowMap(
                      true
                    )
                  }
                  className="
                  rounded-xl
                  bg-blue-600
                  px-4
                  py-2
                  text-white
                  transition
                  hover:bg-blue-700
                "
                >
                  <MapPin
                    size={16}
                    className="inline mr-2"
                  />
                  Select Location
                </button>
              </div>

              {selectedLocation ? (
                <div className="mt-4 rounded-xl bg-green-500/10 p-3 text-green-400">
                  Location Selected ✅
                </div>
              ) : (
                <div className="mt-4 rounded-xl bg-yellow-500/10 p-3 text-yellow-400">
                  Location Not Selected
                </div>
              )}
            </div>

            <div>
              <label
                className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-300
              "
              >
                Landmark Details
              </label>

              <input
                className="
                w-full
                rounded-xl
                border
                border-[#374151]
                bg-[#0F172A]
                p-3
                text-white
                focus:border-blue-500
                focus:outline-none
              "
                placeholder="eg. Near Bennett University Main Gate"
                value={
                  form.location
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    location:
                      e.target
                        .value,
                  })
                }
              />
            </div>

            <button
              disabled={loading}
              className="
              w-full
              rounded-xl
              bg-blue-600
              py-3
              font-medium
              text-white
              transition
              hover:bg-blue-700
              disabled:opacity-50
            "
            >
              {loading
                ? "Submitting..."
                : "Submit Issue"}
            </button>
          </form>
        </div>
      </div>

      {showMap && (
        <div
          className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/70
          p-4
        "
        >
          <div
            className="
            w-full
            max-w-4xl
            rounded-3xl
            bg-[#111827]
            p-5
          "
          >
            <h2 className="mb-4 text-2xl font-bold text-white">
              Select Location
            </h2>

            <LocationPickerWrapper
              onLocationSelect={
                setSelectedLocation
              }
            />

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() =>
                  setShowMap(
                    false
                  )
                }
                className="
                rounded-xl
                bg-green-600
                px-5
                py-2
                text-white
                hover:bg-green-700
              "
              >
                Confirm Location
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

