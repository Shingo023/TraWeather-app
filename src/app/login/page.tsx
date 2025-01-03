"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./LoginPage.module.scss";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      router.push("/weather");
    } else {
      setError("Invalid email address or password. Please try again.");
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <header className={styles.login__header}>
          <div className={styles.login__brand}>
            <Image
              src="/weather-icon.svg"
              alt="Weather Icon"
              width={25}
              height={25}
              priority
            />
            <h1 className={styles.login__appName}>TraWeather</h1>
          </div>
          <h2 className={styles.login__welcomeMessage}>
            Welcome Back!<p>Please enter your details</p>
          </h2>
        </header>
        <form className={styles.login__form} onSubmit={handleSubmit}>
          {error && <p className={styles.login__error}>{error}</p>}
          <div className={styles.login__formGroup}>
            <label className={styles.login__label}>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.login__input}
              />
            </label>
          </div>
          <div className={styles.login__formGroup}>
            <label className={styles.login__label}>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.login__input}
              />
            </label>
          </div>

          <button type="submit" className={styles.login__button}>
            Log In
          </button>
          <p className={styles.login__register}>
            Don&apos;t have an account? <Link href="/register">Sigh up!</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
