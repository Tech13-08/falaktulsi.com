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
      <div className="flex flex-col min-h-screen bg-background">
        <Navigation />
        <main className="flex flex-col justify-center flex-1">
          {<Loading />}
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navigation />
      <main className="flex flex-col justify-center flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
