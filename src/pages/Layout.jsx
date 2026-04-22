import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";

export default function Layout() {
  const [language, setLanguage] = useState("en");

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(205,214,229,0.55),rgba(255,255,255,0)_30%),linear-gradient(180deg,#ffffff_0%,#fbfbfd_36%,#f5f5f7_100%)]" />
      <div className="fixed inset-0 -z-10 opacity-60 [background-image:linear-gradient(rgba(17,17,17,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(17,17,17,0.03)_1px,transparent_1px)] [background-size:120px_120px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
      <Header language={language} setLanguage={setLanguage} />
      <main>
        <Outlet context={{ language }} />
      </main>
    </div>
  );
}
