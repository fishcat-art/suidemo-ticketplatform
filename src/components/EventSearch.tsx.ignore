export default function EventSearch() {
  const handleSearch = (query: string) => {
    console.log('🔍 Searching:', query);
    // TODO: Integrate conversational AI search
  };

  return (
    <div className="max-w-4xl mx-auto mb-20">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-12 flex items-center pointer-events-none">
          <span className="text-2xl">🔍</span>
        </div>
        <input
          type="text"
          placeholder="Search events like 'jazz concerts next week in NYC' or 'rock music Friday'..."
          className="w-full pl-16 pr-16 py-8 text-xl rounded-3xl bg-white/10 backdrop-blur-xl border-2 border-white/20 focus:border-purple-400 focus:outline-none text-white placeholder-gray-300 shadow-xl hover:shadow-2xl transition-all"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(e.currentTarget.value);
            }
          }}
        />
        <div className="absolute inset-y-0 right-0 pr-12 flex items-center">
          <span className="text-sm text-gray-400">AI Powered</span>
        </div>
      </div>
    </div>
  );
}