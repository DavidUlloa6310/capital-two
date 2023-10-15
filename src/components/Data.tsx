import { ReactNode } from "react";
import { IconType } from "react-icons";

interface DataProps {
  data: ReactNode;
  Icon: IconType;
  className: HTMLDivElement["className"];
}

export default function Data({ data, Icon, className }: DataProps) {
  return (
    <div
      className={`tex-sm flex w-fit items-center justify-start gap-2 rounded-lg px-3 py-1 text-white hover:shadow-md ${className}`}
    >
      <Icon />
      <h2 className="text-sm font-light first-letter:capitalize">{data}</h2>
    </div>
  );
}
