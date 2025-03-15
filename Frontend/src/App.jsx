import React, { useState } from "react";
import Home from "./pages/Home";

const App = () => {
  return (
    <main className="dark:bg-backgroundDark bg-backgroundLight min-h-screen font-inter">
      <section className="hidden sm:block w-full border-2 border-secondary">
        <Home />
      </section>
    </main>
  );
};

export default App;
