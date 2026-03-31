import React, { ReactNode, useEffect, useState } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { applyThemeColors } from "../theme/applyThemeColors";
import Loading from "./Loading";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {
      try {
        const saved = localStorage.getItem("selectedPalette");
        if (saved) {
          const palette = JSON.parse(saved);

          applyThemeColors(
            palette.primary,
            palette.secondary,
            palette["primary-dark"],
            palette["secondary-dark"],
          );
        }
      } catch (err) {
        console.error("Failed to load saved palette", err);
      } finally {
        setThemeLoaded(true);
      }
    }, 150);
    return () => clearTimeout(timeout);
  }, []);

  if (!themeLoaded) {
    return (
      <div className="h-screen flex flex-col overflow-hidden bg-background">
        <div className="shrink-0">
          <Navigation />
        </div>
        <main className="flex flex-col flex-1 min-h-0 overflow-hidden justify-center">
          {<Loading />}
        </main>
        <div className="shrink-0">
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <div className="shrink-0">
        <Navigation />
      </div>
      <main className="flex flex-col flex-1 min-h-0 overflow-hidden justify-center">{children}</main>
      <div className="shrink-0">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
