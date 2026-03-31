import { Header } from "@/widgets/header/Header.tsx";
import { Footer } from "@/widgets/footer/Footer.tsx";
import { AppRouter } from "./router/router.tsx";
import { MainLayout } from "@/layouts/MainLayout.tsx";
import "./app.css";


export const App = () => {
  return (
    <div className="app">
      <Header />

      <MainLayout>
        <AppRouter />
      </MainLayout>
      
      <Footer />
    </div>
  );
}
