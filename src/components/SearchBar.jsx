import React from "react";
import { Link } from "react-router-dom";


const SearchBar = ({ query, setQuery, onSearch }) => {
  return (
    <form onSubmit={onSearch} className="flex items-center gap-3">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie here..."
        className="border p-2 rounded w-full"
      />
      <button
        type="submit"
        className="bg-[#45E9F8] text-white px-4 py-2 rounded-lg shadow hover:bg-[#2ad4e5] active:scale-95 transition-all"
      >
        Search
      </button>
      <Link
        to="/watchlist"
        className="bg-[#45E9F8] text-white px-4 py-2 rounded-lg shadow hover:bg-[#2ad4e5] active:scale-95 transition-all"
      >Watchlist</Link>
    </form>
  );
};

export default SearchBar;
