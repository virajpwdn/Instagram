import React, { useState } from "react";
import Home from "./pages/Home";

const App = () => {
  return (
    <main className="dark:bg-backgroundDark bg-backgroundLight">
      <section className="hidden sm:block w-full border-2 border-secondary">
        <Home />   {/* This is the Main/Home Component */}
      </section>
    </main>
  );
};

export default App;
