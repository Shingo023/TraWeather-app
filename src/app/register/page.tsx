"use client";

import { useState, FormEvent } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import styles from "./RegisterForm.module.scss";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    // Define password strength requirements
    const passwordRegex = /^(?=.*[\d!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check if password meets requirements
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters long, and include at least one number or special character, e.g., !@#$%^&*."
      );
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const text = await response.text();
        const data = text ? JSON.parse(text) : {};
        throw new Error(data.message || "An error occurred");
      }

      // Parse success message from server response
      const data = await response.json();
      toast.success(data.message || "Registration successful!");

      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className={styles.register}>
      <form className={styles.register__form} onSubmit={handleSubmit}>
        {error && <p className={styles.register__error}>{error}</p>}
        <div className={styles.register__brand}>
          <img
            src="/weather-icon.svg"
            alt="Weather Icon"
            className={styles.register__icon}
          />
          <h1 className={styles.register__appName}>TraWeather</h1>
        </div>
        <h2 className={styles.register__title}>
          Create an Account<p>Please enter your details</p>
        </h2>
        <div className={styles.register__formGroup}>
          <label className={styles.register__label}>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.register__input}
            />
          </label>
        </div>

        <div className={styles.register__formGroup}>
          <label className={styles.register__label}>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.register__input}
            />
          </label>
        </div>

        <div className={styles.register__formGroup}>
          <label className={styles.register__label}>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.register__input}
            />
          </label>
          <p className={styles.register__hint}>
            At least 6 characters; must include a number or special character,
            e.g., !@#$%^&*
          </p>
        </div>

        <div className={styles.register__formGroup}>
          <label className={styles.register__label}>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={styles.register__input}
            />
          </label>
        </div>

        <button type="submit" className={styles.register__button}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
