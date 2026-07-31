import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";

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
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Patient */}
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

          {/* Provider */}
          <Route
            path="/provider/dashboard"
            element={
              <ProtectedRoute role="provider">
                <ProviderDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/provider/doctors"
            element={
              <ProtectedRoute role="provider">
                <ManageDoctorsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/provider/slots"
            element={
              <ProtectedRoute role="provider">
                <ManageSlotsPage />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<HomeRedirect />} />
        </Routes>
      </main>
    </AuthProvider>
  );
}
