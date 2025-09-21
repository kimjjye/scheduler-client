import { Search } from "lucide-react";

interface SearchProps {
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

const SearchForm = ({
  searchKeyword,
  setSearchKeyword,
  onSearch,
  placeholder = "Search...",
}: SearchProps) => {
  return (
    <div className="rounded-[8px] bg-gray-500/8 max-w-xs">
      <div className="relative max-w-xs">
        <label className="sr-only">Search</label>
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => {
            setSearchKeyword(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
          name="hs-table-search"
          id="hs-table-search"
          className="py-1.5 sm:py-2 px-2 ps-9 block w-full rounded-lg sm:text-sm focus:z-10 focus:outline-none focus:border-indigo-900 focus:ring-1 focus:ring-indigo-900 disabled:opacity-50 disabled:pointer-events-none"
          placeholder={placeholder}
        />
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
          <Search size={20} className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
