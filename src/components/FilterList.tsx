import { capitalizeFirstChar } from "../utils/utils";

function FilterList({
  categoryList = ["brand", "price"],
  setSelectedFilter,
  setIsExpanded,
  isExpanded,
}: {
  categoryList?: string[];
  setSelectedFilter: (value: string) => void;
  setIsExpanded: (value: boolean) => void;
  isExpanded: boolean;
}) {
  return (
    <div className="flex flex-col">
      {categoryList.map((category) => {
        return (
          <button
            key={category}
            type="button"
            name={category}
            className="-mt-px inline-flex items-center gap-x-2 border px-4 py-3 text-left text-sm font-medium text-gray-800 first:mt-0 first:rounded-t-lg last:rounded-b-lg focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-gray-700"
            onClick={(e) => {
              const { name } = e.target as HTMLButtonElement;
              setSelectedFilter(name);
              setIsExpanded(!isExpanded);
            }}
          >
            {capitalizeFirstChar(category)}
          </button>
        );
      })}
    </div>
  );
}

export default FilterList;
