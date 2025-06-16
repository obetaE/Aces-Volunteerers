"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Volunteer() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [expectation, setExpectation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!fullname || !email || !number || !expectation) {
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
        body: JSON.stringify({ fullname, email, number, expectation }),
      });

      const { exists } = await resUserCheck.json();

      if (exists) {
        setError("You have already registered with these details");
        setLoading(false);
        return;
      }

      const sendData = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, email, number, expectation }),
      });

      if (sendData.ok) {
        setFullname("");
        setEmail("");
        setNumber("");
        setExpectation("");

        setSuccess("You've been Successfully Registered");
      } else {
        setError("Unable to Register. Try again later!");
        console.log("Registration failed");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-[#f9f7ff] to-[#f0edff] p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Container - Form */}
        <div className="w-full md:w-1/2 p-6 md:p-10 bg-white">
          <div className="flex justify-between items-center mb-8">
            <Image
              src="/Computer engineering logo.jpg"
              alt="Department Logo"
              width={64}
              height={64}
              className="rounded-full shadow-md"
            />
            <div className="text-right">
              <h1 className="text-xl font-bold text-purple-700">
                Rivers State University
              </h1>
              <p className="text-sm text-gray-600">
                Computer Engineering Department
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Tech Fest <span className="text-orange-500">2024</span>
            </h1>
            <p className="text-lg text-gray-600">
              Register now to join the biggest tech event of the year!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="fullname"
                    name="fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="youremail@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="number"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <input
                    id="number"
                    name="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    type="tel"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="+234 XXX-XXX-XXXX"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="expectation"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Expectations
                </label>
                <textarea
                  id="expectation"
                  name="expectation"
                  value={expectation}
                  onChange={(e) => setExpectation(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="What are you looking forward to at our tech fest?"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 disabled:opacity-70"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Register Now"
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200">
              <p className="text-red-700 font-medium text-center">{error}</p>
            </div>
          )}
          {success && (
            <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
              <p className="text-green-700 font-medium text-center">
                {success}
              </p>
            </div>
          )}
        </div>

        {/* Right Container - Visual */}
        <div className="w-full md:w-1/2 p-6 md:p-10 bg-gradient-to-br from-[#8B80F9] to-[#7469e6] text-white flex flex-col justify-between">
          <div>
            <div className="mb-8">
              <p className="text-xl font-bold mb-1">Rivers State University</p>
              <h2 className="text-3xl font-bold mb-3">Computer Engineering</h2>
              <div className="w-16 h-1 bg-orange-400 rounded-full mb-4"></div>
              <p className="text-lg font-medium opacity-90">Presents</p>
            </div>

            <div className="mb-8">
              <h3 className="text-4xl font-bold mb-3">
                Tech<span className="text-orange-300">Innovate</span>
              </h3>
              <p className="text-lg opacity-90">
                Where innovation meets opportunity
              </p>
            </div>
          </div>

          <div className="techfest-imgs flex flex-col items-center mb-8">
            <div className="relative w-full h-48 mb-6">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl"></div>
              <Image
                src="/IMG_20250517_205100_350.jpg"
                alt="Techfest"
                layout="fill"
                objectFit="contain"
                className="p-4"
              />
            </div>
            <div className="relative w-full h-24">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl"></div>
              <Image
                src="/open-enrollment.gif"
                alt="Open Enrollment"
                layout="fill"
                objectFit="contain"
                className="p-2"
                unoptimized
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-center text-orange-200 mb-4">
              In partnership with
            </p>
            <div className="flex justify-center gap-6">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                <Image
                  src="/IMG-20250515-WA0034.jpg"
                  alt="Logo 1"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                <Image
                  src="/Computer engineering logo.jpg"
                  alt="Logo 2"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                <Image
                  src="/GammaDevs .png"
                  alt="Logo 3"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
