import { ChangeEventHandler } from "react";

function TextInput({
  label,
  onChange,
  className,
}: {
  label: string;
  onChange: ChangeEventHandler<HTMLElement>;
  className?: string;
}) {
  return (
    <label
      className={`flex w-full flex-row items-center justify-center rounded-md border-2 border-gray-200 p-2 text-center font-roboto text-gray-400`}
    >
      {label}
      <input
        type="text"
        onChange={onChange}
        className={`mx-2 w-full rounded-md border-gray-400 transition-all duration-75 ease-in-out hover:border-2`}
      />
    </label>
  );
}

export default TextInput;
