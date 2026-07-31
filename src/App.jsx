import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import HomeRedirect from "./pages/HomeRedirect";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";

import SearchProvidersPage from "./pages/patient/SearchProvidersPage";
import ProviderDetailsPage from "./pages/patient/ProviderDetailsPage";
import BookAppointmentPage from "./pages/patient/BookAppointmentPage";
import MyBookingsPage from "./pages/patient/MyBookingsPage";

import ProviderDashboardPage from "./pages/provider/ProviderDashboardPage";
import ManageDoctorsPage from "./pages/provider/ManageDoctorsPage";
import ManageSlotsPage from "./pages/provider/ManageSlotsPage";

import AdminDashboardPage from "./pages/admin/AdminDashboardPage";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public + Patient pages share the top-navbar layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/search"
            element={
              <ProtectedRoute role="patient">
                <SearchProvidersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/providers/:id"
            element={
              <ProtectedRoute role="patient">
                <ProviderDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book/:doctorId"
            element={
              <ProtectedRoute role="patient">
                <BookAppointmentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute role="patient">
                <MyBookingsPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Provider "back office" pages share the sidebar layout */}
        <Route
          element={
            <ProtectedRoute role="provider">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/provider/dashboard" element={<ProviderDashboardPage />} />
          <Route path="/provider/doctors" element={<ManageDoctorsPage />} />
          <Route path="/provider/slots" element={<ManageSlotsPage />} />
        </Route>

        {/* Admin pages also use the sidebar layout */}
        <Route
          element={
            <ProtectedRoute role="admin">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboardPage />} />
        </Route>

        <Route path="*" element={<HomeRedirect />} />
      </Routes>
    </AuthProvider>
  );
}
