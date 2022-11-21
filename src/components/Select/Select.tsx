interface SelectProps<T extends string | number> {
  name: string;
  value: T;
  options: {
    name: string;
    value: T;
  }[];
  onUpdate: (newValue: T) => void;
}

function Select<T extends string | number>({ name, value, options, onUpdate }: SelectProps<T>) {
  return (
    <select
      value={value}
      onChange={(e) => onUpdate(e.target.value as T)}
      name={name}
      id={name}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default Select;
