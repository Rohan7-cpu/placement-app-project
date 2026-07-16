import { FaSearch } from "react-icons/fa";

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative w-80">

      <FaSearch className="absolute left-4 top-4 text-gray-400" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>
  );
}

export default SearchBar;