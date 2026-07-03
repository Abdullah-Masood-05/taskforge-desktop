import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { ErrorBoundary } from "@/routes/ErrorBoundary";
import DashboardLoading from "@/routes/DashboardLoading";
import styles from "./DashboardLayout.module.css";

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <div className={styles.root}>
      <Sidebar />
      <div className={styles.content}>
        {/* Keyed by pathname so a page error clears on navigation while the
            sidebar shell stays intact. */}
        <ErrorBoundary key={location.pathname}>
          <Suspense fallback={<DashboardLoading />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
