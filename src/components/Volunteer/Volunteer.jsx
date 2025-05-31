"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Volunteer() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [level, setLevel] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!firstname || !lastname || !level || !number) {
      setError("All fields are required!!!");
      setLoading(false);
      return;
    }

    try {
      const resUserCheck = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname, level, number }),
      });

      const { exists } = await resUserCheck.json();

      if (exists) {
        setError("You have already volunteered with these details");
        setLoading(false);
        return;
      }

      const sendName = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname, level, number }),
      });

      if (sendName.ok) {
        setFirstname("");
        setLastname("");
        setLevel("");
        setNumber("");

        setSuccess("You've been successly registered");
      } else {
        setError("Unable to Register Your Name. Try again later!");
        console.log("Registration failed");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full justify-center items-center p-4 bg-gray-100">
      <div className="container flex w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Left Container */}
        <div className="containerLeft flex flex-col w-full md:w-1/2 p-6 md:p-8 bg-white rounded-l-xl">
          <Image
            src="/Computer engineering logo.jpg"
            alt="Department Logo"
            width={64}
            height={64}
            className="rounded-full"
          />

          <h1 className="join text-3xl md:text-4xl font-bold py-4 pt-6">
            Join Us
          </h1>
          <p className="joinsubtext text-lg md:text-xl pb-6">
            Volunteer at the tech fest
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <div className="inputName flex flex-col md:flex-row gap-4 mb-4 w-full">
              <div className="input flex-1">
                <label htmlFor="FName" className="block mb-1 font-medium">
                  First Name
                </label>
                <input
                  id="FName"
                  name="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="input flex-1">
                <label htmlFor="LName" className="block mb-1 font-medium">
                  Last Name
                </label>
                <input
                  id="LName"
                  name="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="input mb-4 w-full">
              <label htmlFor="role" className="block mb-1 font-medium">
                Volunteer Role
              </label>
              <select
              id="role"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="Unsure">Unsure</option>
                <option value="Marketing and Publicity">
                  Marketing and Publicity
                </option>
                <option value="Logistics and Setup">Logistics and Setup</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Registration and Information">
                  Registration and Information
                </option>
                <option value="Event Management">Event Management</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Media, Design and Creative">
                  Media, Design and Creative
                </option>
                <option value="Documentation and Content Creation">
                  Documentation and Content Creation
                </option>
                <option value="Safety and Risk Management">
                  Safety and Risk Management
                </option>
              </select>
            </div>

            <div className="input mb-6 w-full">
              <label htmlFor="number" className="block mb-1 font-medium">
                Phone Number
              </label>
              <input
                id="number"
                name="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                type="tel"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="submit mt-2 w-full md:w-auto px-8 py-3 bg-orange-600 hover:bg-orange-700 transition-colors text-white font-bold rounded-lg disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Volunteer"}
            </button>
          </form>
          {error && (
            <p className="text-red-600 font-bold mt-4 text-center">{error}</p>
          )}
          {success && (
            <p className="text-green-600 font-bold mt-4 text-center">
              {success}
            </p>
          )}
        </div>

        {/* Right Container */}
        <div className="containerRight flex flex-col justify-between w-full md:w-1/2 p-6 md:p-8 bg-[#8B80F9] rounded-r-xl">
          <div>
            <p className="fText text-white text-xl md:text-2xl font-bold mb-2">
              Computer Engineering
            </p>
            <p className="presents text-white mb-6 font-bold">Presents:</p>
          </div>

          <div className="techfest-imgs flex flex-col items-center">
            <div className="relative w-full max-w-xs h-48 mb-4">
              <Image
                src="/IMG_20250517_205100_350.jpg"
                alt="Techfest"
                layout="fill"
                objectFit="contain"
                className="techfest_icon"
              />
            </div>
            <div className="relative w-full max-w-xs h-24">
              <Image
                src="/open-enrollment.gif"
                alt="Open Enrollment"
                layout="fill"
                objectFit="contain"
                className="techfest_icon"
                unoptimized
              />
            </div>
          </div>

          <div className="logos flex justify-center gap-4 mt-6">
            <Image
              src="/IMG-20250515-WA0034.jpg"
              alt="Logo 1"
              width={56}
              height={56}
              className="rounded-full"
            />
            <Image
              src="/Computer engineering logo.jpg"
              alt="Logo 2"
              width={56}
              height={56}
              className="rounded-full"
            />
            <Image
              src="/GammaDevs .png"
              alt="Logo 3"
              width={56}
              height={56}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
