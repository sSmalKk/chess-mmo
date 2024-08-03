import React from "react";
import { Text, Img } from "./..";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
  heading?: any; // assuming userData or null/undefined
  text?: React.ReactNode | string;
  Status?: string;
  life: number;
}

export default function Header({ ...props }: Props) {
  // Se o usuário não estiver logado, não renderiza o header
  if (!props.heading) {
    return null;
  }

  return (
    <header className={`p-5 ${props.className}`}>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          <Img src="images/img_u_blogger.svg" alt="ublogger_one" className="h-[50px] rounded-full" />
          <Text size="xl" as="p" className="text-white">
            {props.heading.userName}
          </Text>
        </div>
        <button className="bg-red-700 text-white px-4 py-2 rounded">
          LOGOUT
        </button>
      </div>
    </header>
  );
}
