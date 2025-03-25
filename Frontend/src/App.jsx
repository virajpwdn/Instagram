import React, { useState } from "react";
import Home from "./pages/Home";
import MobileHome from "./pages/MobileHome";
import BottomDock from "./components/ui/BottomDock";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";

const App = () => {
  const isMobile = window.innerWidth <= 640;

  return (
    <main className="dark:bg-backgroundDark bg-backgroundLight text-textLight dark:text-textDark min-h-screen font-inter">
      <section
        className={`${
          isMobile
            ? "border-2 border-green-500 min-h-screen"
            : "w-full border-2 border-primary flex items-center justify-center"
        }`}
      >
        <AppRoutes />
      </section>

      {isMobile && (
        <section className="dock">
          <BottomDock />
        </section>
      )}
    </main>
  );
};

export default App;
