import { Menu } from 'lucide-react';
import { useThemeStore } from '../store/useTheme';
import { Link } from 'react-router-dom';

export default function Topbar() {
  const { toggleMobileMenu } = useThemeStore();

  return (
    <header
      className="bg-white border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800 flex items-center justify-between shrink-0 sticky top-0 z-10 px-4 md:px-7 h-[60px]"
    >
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden text-slate-500 hover:text-slate-800 dark:hover:text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-bold text-lg text-blue-400">
          RiLyQueue Admin
        </span>
      </div>
      <Link
        to="/profil"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "#38bdf8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 700,
          cursor: "pointer",
          fontSize: 15,
          textDecoration: "none",
        }}
      >
        A
      </Link>
    </header>
  );
}