import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';

import AuthLayout from '@/layouts/AuthLayout';
import MainLayout from '@/layouts/MainLayout';
import LoadingHeader from '../../shared/components/LoadingHeader';

import SocketProvider from '../providers/SocketProvider';

import TimetableScheduleLayout from '@/layouts/TimetableScheduleLayout';
import Schedule from '@/features/timetable-schedule/components/Schedule';

const LandingPage = lazy(() => import('@/pages/LandingPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('@/pages/ResetPasswordPage'));

const TimetablesPage = lazy(() => import('@/pages/TimetablesPage'));
const TemplatesPage = lazy(() => import('@/pages/TemplatesPage'));
const ResourcesPage = lazy(() => import('@/pages/ResourcesPage'));
const FeedbackPage = lazy(() => import('@/pages/FeedbackPage'));

const TimetableDesignPage = lazy(() => import('@/pages/TimetableDesignPage'));
const TimetableEditPage = lazy(() => import('@/pages/TimetableEditPage'));
const TimetableSchedulePage = lazy(() => import('@/pages/TimetableSchedulePage'));

const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingHeader />}>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/timetables" element={<TimetablesPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Route>

          <Route element={<SocketProvider />}>
            <Route path="/timetables/:timetableId/design" element={<TimetableDesignPage />} />
          </Route>

          <Route path="/timetables/:timetableId/edit" element={<TimetableEditPage />} />

          <Route path="/timetables/:timetableId" element={<TimetableScheduleLayout />}>
            <Route index element={<Schedule />} />
            <Route path=":sectionId" element={<TimetableSchedulePage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
