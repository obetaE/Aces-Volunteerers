
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
  const [loadingRegister, setLoadingRegister] = useState(true);
  const [register, setRegister] = useState([]);
  const [registerError, setRegisterError] = useState("");

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

  // Fetch registered on component mount
  useEffect(() => {
    const fetchRegistered = async () => {
      try {
        setLoadingRegister(true);
        const response = await fetch("/api/register");

        if (!response.ok) {
          throw new Error(
            `Failed to fetch Registered People: ${response.status}`
          );
        }

        const data = await response.json();
        setRegister(data);
        setRegisterError("");
      } catch (error) {
        console.error("Error fetching registered users:", error);
        setRegisterError("Failed to load registered users data");
      } finally {
        setLoadingRegister(false);
      }
    };

    fetchRegistered();
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
      const response = await fetch("/api/messages", {
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
      <div className={styles.header}>
        <h1>Admin Dashboard</h1>
        <p>Manage volunteers and registered candidates</p>
      </div>

      <div className={styles.grid}>
        {/* Volunteers Section */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Registered Volunteers</h2>
            <span className={styles.countBadge}>{volunteers.length}</span>
          </div>

          <div className={styles.cardContent}>
            {loadingVolunteers ? (
              <div className={styles.loading}>Loading volunteers...</div>
            ) : volunteerError ? (
              <div className={styles.error}>{volunteerError}</div>
            ) : volunteers.length > 0 ? (
              <div className={styles.listContainer}>
                {volunteers.map((volunteer) => (
                  <div key={volunteer._id} className={styles.listItem}>
                    <div className={styles.itemContent}>
                      <div className={styles.itemHeader}>
                        <span className={styles.name}>
                          {volunteer.firstname} {volunteer.lastname}
                        </span>
                        <span className={styles.role}>{volunteer.level}</span>
                      </div>
                      <div className={styles.itemDetails}>
                        <span className={styles.detail}>
                          <strong>Phone:</strong> {volunteer.number}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>No volunteers registered yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Candidates Section */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Registered Candidates</h2>
            <span className={styles.countBadge}>{register.length}</span>
          </div>

          <div className={styles.cardContent}>
            {loadingRegister ? (
              <div className={styles.loading}>
                Loading registered candidates...
              </div>
            ) : registerError ? (
              <div className={styles.error}>{registerError}</div>
            ) : register.length > 0 ? (
              <div className={styles.listContainer}>
                {register.map((registers) => (
                  <div key={registers._id} className={styles.listItem}>
                    <div className={styles.itemContent}>
                      <div className={styles.itemHeader}>
                        <span className={styles.name}>
                          {registers.fullname}
                        </span>
                        <span className={styles.email}>{registers.email}</span>
                      </div>
                      <div className={styles.itemDetails}>
                        <span className={styles.detail}>
                          <strong>Phone:</strong> {registers.number}
                        </span>
                        <span className={styles.detail}>
                          <strong>Expectation:</strong> {registers.expectation}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>No candidates registered yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Admin Form Section */}
        <div className={`${styles.card} ${styles.adminCard}`}>
          <div className={styles.cardHeader}>
            <h2>Create New Admin</h2>
          </div>

          <div className={styles.cardContent}>
            <form onSubmit={handleAdminSubmit} className={styles.form}>
              <div className={styles.formGroup}>
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

              <div className={styles.formGroup}>
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

              <div className={styles.formGroup}>
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

              <div className={styles.formGroup}>
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

              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? "Creating..." : "Register New Admin"}
              </button>
            </form>

            {adminError && (
              <div className={styles.errorMessage}>{adminError}</div>
            )}
            {adminSuccess && (
              <div className={styles.successMessage}>{adminSuccess}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
