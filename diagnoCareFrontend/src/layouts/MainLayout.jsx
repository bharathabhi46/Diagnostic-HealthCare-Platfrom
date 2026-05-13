import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
function MainLayout() {
  return (
    <div className="min-h-screen bg-[#f7faf9]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-slate-500 sm:px-6 lg:px-8">
          DiagnoCare diagnostic booking and care coordination.
        </div>
      </footer>
    </div>
  );
}
export default MainLayout;
