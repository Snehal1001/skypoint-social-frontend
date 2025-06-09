import Login from "@/features/auth/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import ProtectedLayout from "./components/ProtectedLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./features/auth/Signup";
import Feed from "./features/feed/Feed";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/feed" element={<Feed />} />
            {/* Add other protected routes here */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
