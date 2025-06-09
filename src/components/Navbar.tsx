import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { logout } from "@/features/auth/authService";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await logout();
      localStorage.removeItem("token");
      toast.success(`Logout in ${result.sessionDuration}`, {
        duration: 3000,
      });
      navigate("/login");
      // navigate("/login");
    } catch (error) {
      toast.error("Logout failed", {
        duration: 3000,
      });
    }
  };

  return (
    <header className="w-full border-b shadow-sm bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg sm:text-2xl font-semibold text-black-600">
          Skypoint Social
        </h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
