import { Outlet } from "react-router-dom";
import { NavigationTabs } from "./NavigationTabs";
import { ThemeProvider } from "./ThemeProvider";

const MainLayout = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="cinefluent-theme">
      <div className="min-h-screen bg-background flex flex-col transition-colors duration-300">
        <div className="fixed top-4 right-4 z-50">
        </div>
        
        <main className="flex-1 pb-20">
          <Outlet />
        </main>
        <NavigationTabs />
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;
