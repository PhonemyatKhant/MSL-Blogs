import React from "react";
import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="min-h-screen bg-background text-foreground  dark:text-white dark:bg-black">
        {children}{" "}
      </div>
    </div>
  );
};

export default ThemeProvider;
