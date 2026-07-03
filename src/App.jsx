import { lazy } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import QueryProvider from "@/components/layout/QueryProvider";
import { Toaster } from "@/components/ui/Toaster";
import { ErrorBoundary } from "@/routes/ErrorBoundary";
import { ProtectedRoute, PublicOnlyRoute } from "@/routes/ProtectedRoute";
import AuthLayout from "@/routes/AuthLayout";
import DashboardLayout from "@/routes/DashboardLayout";

const LoginPage = lazy(() => import("@/routes/LoginPage"));
const RegisterPage = lazy(() => import("@/routes/RegisterPage"));
const DashboardPage = lazy(() => import("@/routes/DashboardPage"));
const OrgDetailPage = lazy(() => import("@/routes/OrgDetailPage"));
const ProjectsPage = lazy(() => import("@/routes/ProjectsPage"));
const BoardPage = lazy(() => import("@/routes/BoardPage"));
const BillingPage = lazy(() => import("@/routes/BillingPage"));
const PricingPage = lazy(() => import("@/routes/PricingPage"));

export default function App() {
  return (
    <QueryProvider>
      <HashRouter>
        <ErrorBoundary title="Application error">
          <Routes>
            {/* Public-only routes — authenticated users are sent to the dashboard */}
            <Route element={<PublicOnlyRoute />}>
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>
            </Route>

            {/* Protected routes — unauthenticated users are sent to /login */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/orgs/:slug" element={<OrgDetailPage />} />
                <Route path="/orgs/:slug/projects" element={<ProjectsPage />} />
                <Route
                  path="/orgs/:slug/projects/:projectId/board"
                  element={<BoardPage />}
                />
                <Route path="/orgs/:slug/billing" element={<BillingPage />} />
                <Route path="/orgs/:slug/pricing" element={<PricingPage />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ErrorBoundary>
      </HashRouter>
      <Toaster />
    </QueryProvider>
  );
}
