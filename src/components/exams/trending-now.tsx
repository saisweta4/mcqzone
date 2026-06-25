export function TrendingNow() {
  return (
    <div className="bg-[#f0f4fd] rounded-xl p-6 border h-full">
      <h3 className="text-xs font-bold text-gray-500 tracking-wider mb-2">TRENDING NOW</h3>
      <p className="text-sm text-gray-700 mb-5">
        OPSC ASO Foundation 75% users started this week.
      </p>
      
      <div className="space-y-3">
        <button className="w-full bg-white border rounded-lg p-3 text-sm font-medium text-left flex justify-between items-center hover:shadow-sm transition-shadow">
          Modern History Note 
          <span className="bg-gray-50 text-gray-500 text-xs px-2 py-1 rounded">2 Min Resolve</span>
        </button>
        <button className="w-full bg-white border rounded-lg p-3 text-sm font-medium text-left flex justify-between items-center hover:shadow-sm transition-shadow">
          Odia Grammar Mock 
          <span className="bg-gray-50 text-gray-500 text-xs px-2 py-1 rounded">1 Min Resolve</span>
        </button>
      </div>
    </div>
  );
}