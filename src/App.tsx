import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "@/features/auth/Login";
import Signup from "./features/auth/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Feed from "./features/feed/Feed";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/feed" element={<Feed />} />
          {/* Add other protected routes here later */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
