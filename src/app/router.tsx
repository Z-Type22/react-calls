import { Routes, Route } from "react-router-dom";
import { Calls } from "@/pages/Calls/Calls";
import { Login } from "@/pages/Login/Login";
import { Registration } from "@/pages/Registration/Registration";
import { CallDetails } from "@/pages/CallDetails/CallDetails";
import { ProtectedRoute } from "./providers/ProtectedRoute";

export const AppRouter = () => (
  <Routes>
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Calls />
        </ProtectedRoute>
      }
    />
    <Route
      path="/calls/:call_id"
      element={
        <ProtectedRoute>
          <CallDetails />
        </ProtectedRoute>
      }
    />

    <Route path="/login" element={<Login />} />
    <Route path="/registration" element={<Registration />} />
  </Routes>
);
