import React, { useState } from "react";
import Home from "./pages/Home";
import MobileHome from "./pages/MobileHome";
import BottomDock from "./components/ui/BottomDock";

const App = () => {
  return (
    <main className="dark:bg-backgroundDark bg-backgroundLight min-h-screen font-inter">
      <section className="hidden sm:block w-full border-2 border-secondary">
        <Home />
      </section>
      <section className="sm:hidden border-2 border-green-500 min-h-screen font-inter text-textLight dark:text-textDark">
        <MobileHome />
      </section>
      <section className="dock sm:hidden">
        {/* TODO: update the component after Routes Setup For Navigation */}
        <BottomDock />
      </section>
    </main>
  );
};

export default App;
