type SearchBarProps = {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function SearchBar({ placeholder, value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}

export default SearchBar;
