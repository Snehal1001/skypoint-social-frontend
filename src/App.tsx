import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/features/auth/Login";
import Signup from "./features/auth/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Add other protected routes here later */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
