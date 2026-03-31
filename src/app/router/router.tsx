import { Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home.tsx";
import { Login } from "@/pages/Login.tsx";
import { Registration } from "@/pages/Registration.tsx";

export const AppRouter = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
    </Routes>
);
