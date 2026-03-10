import React from 'react';
import { User, Phone, Shield, Clock, Lightbulb, LogOut } from 'lucide-react';
import { useThemeStore } from '../store/useTheme';

export default function Profil() {
  const { darkMode, toggleDarkMode } = useThemeStore();

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-8">Admin Profile</h1>

      {/* Main Profile Card */}
      <div className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm p-8 mb-6">
        
        {/* Avatar & Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white mb-4 shadow-sm">
            <User className="w-12 h-12" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Admin User</h2>
          <p className="text-slate-400 dark:text-slate-500 text-sm">Administrator</p>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-700/50 mb-6"></div>

        {/* Info List */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm font-medium">
            <Phone className="w-4 h-4 text-blue-500" />
            <span>Phone: +212 6XX XXX 900</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm font-medium">
            <Shield className="w-4 h-4 text-blue-500" />
            <span>Role: Admin / Support</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm font-medium">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>Last Login: 2026-02-24 11:45:23</span>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-700/50 mb-6"></div>

        {/* Settings Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 text-sm font-medium mb-1">
              <Lightbulb className="w-4 h-4 text-blue-500" />
              <span>Dark Mode</span>
            </div>
            <span className="text-[13px] text-slate-400">Toggle between light and dark theme</span>
          </div>
          {/* Custom Toggle switch representation */}
          <button 
            type="button"
            onClick={toggleDarkMode}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${darkMode ? 'bg-blue-500' : 'bg-slate-300'}`}
            role="switch"
            aria-checked={darkMode}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}
            />
          </button>
        </div>

      </div>

      {/* Account Actions Card */}
      <div className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Account Actions</h3>
        <button className="w-full flex items-center justify-center gap-2 bg-[#f43f5e] hover:bg-rose-600 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-sm">
          <LogOut className="w-5 h-5" strokeWidth={2} />
          Logout
        </button>
      </div>

    </div>
  );
}
