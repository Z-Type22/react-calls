import { Routes, Route } from "react-router-dom";
import { Calls } from "@/pages/Calls/Calls";
import { Login } from "@/pages/Login/Login";
import { Registration } from "@/pages/Registration/Registration";
import { CallDetails } from "@/pages/CallDetails/CallDetails";
import { ConnectedCalls } from "@/pages/ConnectedCalls/ConnectedCalls";
import { CallConnect } from "@/pages/CallConnect/CallConnect";
import { ProtectedRoute } from "@/app/providers/ProtectedRoute";

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
      path="/calls"
      element={
        <ProtectedRoute>
          <ConnectedCalls />
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

    <Route
      path="/calls/connect/:call_id"
      element={
        <ProtectedRoute>
          <CallConnect />
        </ProtectedRoute>
      }
    />

    <Route path="/login" element={<Login />} />
    <Route path="/registration" element={<Registration />} />
  </Routes>
);
