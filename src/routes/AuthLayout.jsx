import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";

export default function AuthLayout() {
  return (
    <div className={styles.root}>
      <div className="auth-bg" />

      {/* Decorative orbs */}
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      <main className={styles.main}>
        <div className={styles.card}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </div>

        <p className={styles.brand}>
          <span className={styles.brandName}>TaskForge</span>
          <span className={styles.brandTagline}> — Built for modern teams</span>
        </p>
      </main>
    </div>
  );
}
