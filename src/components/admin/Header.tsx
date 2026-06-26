import { Search, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-96">
        <Search className="w-4 h-4 text-gray-400 mr-2" />
        <input 
          type="text" 
          placeholder="Global search (Exams, Questions, Users...)" 
          className="bg-transparent border-none outline-none text-sm w-full"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-500 hover:text-gray-700">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 border-l pl-6">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">Ranjit Kumar</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden border">
            {/* Placeholder for avatar */}
            <img src="https://ui-avatars.com/api/?name=Ranjit+Kumar&background=0D8ABC&color=fff" alt="User Avatar" />
          </div>
        </div>
      </div>
    </header>
  );
}