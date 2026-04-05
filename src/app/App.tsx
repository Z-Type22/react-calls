import { Header } from "@/widgets/Header/Header.tsx";
import { Footer } from "@/widgets/Footer/Footer.tsx";
import { AppRouter } from "./router.tsx";
import { MainLayout } from "@/layouts/MainLayout.tsx";
import { UserProvider } from "@/app/providers/UserProvider.tsx";
import "./app.css";

export const App = () => {
  return (
    <div className="app">
      <UserProvider>

        <Header />

        <MainLayout>
          <AppRouter />
        </MainLayout>
      
        <Footer />

      </UserProvider>
    </div>
  );
}
