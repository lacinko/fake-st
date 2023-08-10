type Props = {
  id: string;
  labelTitle: string;
  labelDescription?: string;
  labelValue: string;
  icon: JSX.Element;
  handleOnChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
  selectedValue: string;
};

function OptionsItem({
  id,
  labelDescription,
  labelTitle,
  labelValue,
  icon,
  handleOnChange,
  selectedValue,
}: Props) {
  let isHiddenWhenSelected = "";
  if (selectedValue === "") {
    isHiddenWhenSelected = "";
  } else {
    isHiddenWhenSelected = selectedValue !== id ? "hidden" : "";
  }

  return (
    <div className={`${isHiddenWhenSelected} m-4 flex items-center gap-3`}>
      <input
        id={id}
        name={id}
        type="checkbox"
        className="h-5 w-5 rounded border-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800"
        onChange={(e) => handleOnChange(e, id)}
        checked={selectedValue === id}
      />
      <div className="h-[40px] w-[40px]">{icon}</div>
      <div className="flex w-full flex-col">
        <p className="w-full text-xs font-semibold">{labelTitle}</p>
        <p className="inline-flex w-full justify-between text-xs text-green-500">
          {labelDescription}
          <span>{labelValue}</span>
        </p>
      </div>
    </div>
  );
}

export default OptionsItem;
