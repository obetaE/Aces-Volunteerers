"use client";
import React, { useState, useEffect } from "react";
import styles from "./admin.module.css";

export default function AdminPanel() {
  // Admin registration states
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [adminError, setAdminError] = useState("");
  const [adminSuccess, setAdminSuccess] = useState("");

  // Volunteer data state
  const [volunteers, setVolunteers] = useState([]);
  const [loadingVolunteers, setLoadingVolunteers] = useState(true);
  const [volunteerError, setVolunteerError] = useState("");

  // Fetch volunteers on component mount
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        setLoadingVolunteers(true);
        const response = await fetch("/api/messages");

        if (!response.ok) {
          throw new Error(`Failed to fetch volunteers: ${response.status}`);
        }

        const data = await response.json();
        setVolunteers(data);
        setVolunteerError("");
      } catch (error) {
        console.error("Error fetching volunteers:", error);
        setVolunteerError("Failed to load volunteer data");
      } finally {
        setLoadingVolunteers(false);
      }
    };

    fetchVolunteers();
  }, []);

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAdminError("");
    setAdminSuccess("");

    // Validation
    if (!fullname || !email || !password || !confirmpassword) {
      setAdminError("All fields are required");
      setLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      setAdminError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, email, password }),
      });

      if (response.ok) {
        setFullname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAdminSuccess("Admin created successfully");
      } else {
        const errorData = await response.json();
        setAdminError(errorData.message || "Admin registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setAdminError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Welcome, what do you want to do today?</h1>

      <div className={styles.section}>
        <div className={styles.volunteer}>
          <h2 className={styles.volunteerHeader}>Registered Volunteers</h2>

          {loadingVolunteers ? (
            <div className={styles.loading}>Loading volunteers...</div>
          ) : volunteerError ? (
            <div className={styles.error}>{volunteerError}</div>
          ) : volunteers.length > 0 ? (
            volunteers.map((volunteer) => (
              <div key={volunteer._id} className={styles.volunteerItem}>
                <div className={styles.left}>
                  <span>First Name: {volunteer.firstname}</span>
                  <span>Last Name: {volunteer.lastname}</span>
                  <span>Number: {volunteer.number}</span>
                </div>
                <div className={styles.right}>Role: {volunteer.level} </div>
              </div>
            ))
          ) : (
            <p>No volunteers registered yet</p>
          )}
        </div>

        <div className={styles.admin}>
          <span className={styles.adminHeader}>Create A New Admin</span>
          <form onSubmit={handleAdminSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="fullname">Full Name:</label>
              <input
                type="text"
                id="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Type your FullName"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type your Email"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type your Password"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="confirmpassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmpassword"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your Password"
                required
              />
            </div>

            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "Creating..." : "Register New Admin"}
            </button>
          </form>

          {adminError && <p className={styles.error}>{adminError}</p>}
          {adminSuccess && <p className={styles.success}>{adminSuccess}</p>}
        </div>
      </div>
    </div>
  );
}
