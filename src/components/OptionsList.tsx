import OptionsItem from "./OptionsItem";

type OptionObject = {
  id: string;
  label: string;
  description?: string;
  value: string;
  icon: JSX.Element;
};

type Props = {
  options: OptionObject[];
  handleOnChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
  selectedValue: string;
};

function OptionsList({ options, handleOnChange, selectedValue }: Props) {
  return (
    <div className="flex flex-col bg-slate-50">
      {options.map((option) => (
        <OptionsItem
          id={option.id}
          key={option.label}
          labelTitle={option.label}
          labelDescription={option.description}
          labelValue={option.value}
          icon={option.icon}
          handleOnChange={handleOnChange}
          selectedValue={selectedValue}
        />
      ))}
    </div>
  );
}

export default OptionsList;
