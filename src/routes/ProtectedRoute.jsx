import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/lib/store/authStore";

/**
 * Route guard for authenticated areas.
 * Reads the persisted Zustand auth store; unauthenticated visitors are
 * redirected to /login with a `from` param so they return where they started.
 */
export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    const from = `${location.pathname}${location.search}`;
    return (
      <Navigate
        to={{ pathname: "/login", search: `?from=${encodeURIComponent(from)}` }}
        replace
      />
    );
  }

  return <Outlet />;
}

/**
 * Route guard for login/register.
 * Authenticated users are bounced back to the dashboard.
 */
export function PublicOnlyRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
