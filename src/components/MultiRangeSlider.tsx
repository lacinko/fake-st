import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  ChangeEvent,
} from "react";

type MultiRangeSliderProps = {
  min: number;
  max: number;
  //onChange: (min: number, max: number) => void;
};

function MultiRangeSlider({ min, max }: MultiRangeSliderProps) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const [sliderWidth, setSliderWidth] = useState(0);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLInputElement>(null);
  const sliderWidthRef = useRef<HTMLInputElement>(null);

  const inputCSS = `
    highlight-color-transparent
    pointer-events-none absolute z-30 h-0 max-w-sm w-full
    touch-none appearance-none bg-blue-500 outline-none
    [&::-webkit-slider-thumb]:pointer-events-auto 
    [&::-webkit-slider-thumb]:relative 
    [&::-webkit-slider-thumb]:mt-[20px] 
    [&::-webkit-slider-thumb]:h-[18px] 
    [&::-webkit-slider-thumb]:w-[18px] 
    [&::-webkit-slider-thumb]:cursor-pointer 
    [&::-webkit-slider-thumb]:rounded-full 
    [&::-webkit-slider-thumb]:border-none 
    [&::-webkit-slider-thumb]:bg-blue-500 
    [&::-webkit-slider-thumb]:shadow
    [&::-webkit-slider-thumb]:appearance-none
    `;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === "min") {
      const value = Math.min(+e.target.value, maxVal - 1);
      setMinVal(value);
      e.target.value = value.toString();
    }
    if (e.target.name === "max") {
      const value = Math.max(+e.target.value, minVal + 1);
      setMaxVal(value);
      e.target.value = value.toString();
    }
  }

  function handleSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const { name, value } = e.target as HTMLInputElement;
      if (name === "min") {
        if (+value > maxVal) return setMinVal(maxVal - 1);
        if (+value < min) return setMinVal(min);
        return setMinVal(+value);
      }
      if (name === "max") {
        if (+value < minVal) return setMaxVal(minVal + 1);
        if (+value > max) return setMaxVal(max);
        setMaxVal(+value);
      }
    }
  }

  useLayoutEffect(() => {
    if (sliderWidthRef.current) {
      setSliderWidth(sliderWidthRef.current.offsetWidth);
    }
  }, []);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  /*
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);
*/
  return (
    <>
      <div className="relative mx-auto w-full max-w-sm">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          className={`${inputCSS} ${minVal > max - 100 ? "z-50" : ""} z-30`}
          name="min"
          onChange={handleChange}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          className={`${inputCSS} z-40`}
          name="max"
          onChange={handleChange}
        />
      </div>
      <div
        className="relative mx-auto mb-10 w-full max-w-sm"
        ref={sliderWidthRef}
      >
        <div className="absolute z-10 h-2 w-full rounded-[3px] bg-slate-400" />
        <div
          ref={range}
          className="absolute z-20 h-2 rounded-[3px] bg-blue-200"
        />
        <div className="absolute left-2 mt-5 text-base">
          {minVal < min ? min : minVal}
        </div>
        <div className="absolute -right-[4px] mt-5 text-base">
          {maxVal > max ? max : maxVal}
        </div>
      </div>
      <div className="flex justify-start gap-2">
        <div className="mx-auto flex w-full max-w-sm justify-between gap-8">
          <input
            type="text"
            name="min"
            value={minVal}
            placeholder="Minimal value"
            className="w-full max-w-[150px] rounded-md border-2 border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMinVal(+e.target.value)
            }
            //onKeyDown={handleSubmit}
          />
          <input
            type="text"
            name="max"
            value={maxVal}
            placeholder="Maximal value"
            className="w-full max-w-[150px] rounded-md border-2 border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMaxVal(+e.target.value)
            }
            //onKeyDown={handleSubmit}
          />
        </div>
      </div>
    </>
  );
}

export default MultiRangeSlider;
