import { Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login/Login";
import { Registration } from "@/pages/Registration/Registration";

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/registration" element={<Registration />} />
  </Routes>
);
