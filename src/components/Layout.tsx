import React, { ReactNode, useEffect } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { applyThemeColors } from "../theme/applyThemeColors";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    // Backup if the pre-paint script in index.html was skipped (e.g. tests).
    try {
      const saved = localStorage.getItem("selectedPalette");
      if (!saved) return;
      const palette = JSON.parse(saved);
      applyThemeColors(
        palette.primary,
        palette.secondary,
        palette["primary-dark"],
        palette["secondary-dark"],
      );
    } catch (err) {
      console.error("Failed to load saved palette", err);
    }
  }, []);

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
