import { useState } from "react";
import { capitalizeFirstChar } from "../utils/utils";
import MultiRangeSlider from "./MultiRangeSlider";
import Switch from "./Switch";

function ExpandedFilter({
  selectedFilter,
  setSelectedFilter,
  setIsExpanded,
  isExpanded,
  sliderMin,
  sliderMax,
}: {
  selectedFilter: string;
  setSelectedFilter: Function;
  setIsExpanded: Function;
  isExpanded: boolean;
  sliderMin: number;
  sliderMax: number;
}) {
  return (
    <div className="flex w-full flex-col">
      <button
        type="button"
        name="brand"
        className="-mt-px inline-flex items-center gap-x-2 border py-3 pl-2 pr-4 text-left text-sm font-medium text-blue-600 first:mt-0 first:rounded-t-lg last:rounded-b-lg focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-gray-700"
        onClick={(e) => {
          setSelectedFilter(e.target.name);
          setIsExpanded(!isExpanded);
        }}
      >
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          {capitalizeFirstChar(selectedFilter)}
        </div>
      </button>
      <Switch test={selectedFilter}>
        <div value="brand" className="flex flex-col gap-2 p-4">
          <div className="flex">
            <input
              type="checkbox"
              className="pointer-events-none mt-0.5 shrink-0 rounded border-gray-200 text-blue-600 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800"
              id="hs-default-checkbox"
            />
            <label
              for="hs-default-checkbox"
              className="ml-3 text-sm text-gray-500 dark:text-gray-400"
            >
              Default checkbox
            </label>
          </div>
        </div>
        <div value="price" className="flex flex-col gap-2 p-4">
          <MultiRangeSlider
            min={sliderMin}
            max={sliderMax}
            onChange={({ min, max }) =>
              console.log(`min = ${min}, max = ${max}`)
            }
          />
        </div>
      </Switch>
    </div>
  );
}

export default ExpandedFilter;
