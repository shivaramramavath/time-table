import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import LoadingHeader from "../../shared/components/LoadingHeader";

const LandingPage = lazy(() => import("@/pages/LandingPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPasswordPage"));
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import SocketProvider from "../providers/SocketProvider";

const TimetablesPage = lazy(() => import("@/pages/TimetablesPage"));
const TimetableDesignerPage = lazy(
  () => import("@/pages/TimetableDesignerPage"),
);
const TemplatesPage = lazy(() => import("@/pages/TemplatesPage"));
const FeedbackPage = lazy(() => import("@/pages/FeedbackPage"));

const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingHeader />}>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/timetables" element={<TimetablesPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Route>

          <Route element={<SocketProvider />}>
            <Route
              path="/timetables/designer"
              element={<TimetableDesignerPage />}
            />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
