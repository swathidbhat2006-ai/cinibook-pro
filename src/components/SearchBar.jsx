function SearchBar({ search, setSearch }) {
  return (
    <div className="flex justify-center my-10">
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-[500px] bg-[#1f1f1f] text-white px-6 py-4 rounded-xl outline-none border border-gray-700"
      />
    </div>
  );
}

export default SearchBar;