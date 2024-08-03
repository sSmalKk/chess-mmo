import React from "react";
import { Text, Img } from "./..";
import Perfil from "components/Perfil";
import { Buttongreen } from "./buttongreen";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
  heading?: string;
  text?: React.ReactNode | string;
  Status?: string;
  life: number;
}

export default function Header({ ...props }: Props) {
  return (
    <header {...props}>
      {props.heading ? (
        <>
        </>
      ) : (
        <>
          <Link to="/register">
            <button
              className={`bg-green-700 text-white-A700 h-[101px] px-[33px] text-xs flex items-center justify-center text-center cursor-pointer `}
            >
              SING UP
            </button>
          </Link>
          <Img src="images/img_u_blogger.svg" alt="ublogger_one" className="h-[101px] ml-[75px] md:ml-5" /><Text size="3xl" as="p" className="w-[24%] !text-[39.63px]">
            Come to join us today!
          </Text></>
      )}

      {props.heading ? (
        <><Text size="3xl" as="p" className="w-[24%] !text-[39.63px]">
          Come to join us today!
        </Text><Perfil
            heading={`${props.Status}`}
            Status={` ${props.Status}`}
            text={`${props.text}`}
            className="flex flex-col items-center justify-start w-[33%] mr-[75px] gap-[5px] p-5 md:mr-5 bg-black-900_99 rounded-[3px]" life={props.life} /></>
      ) : (
        null
      )}
    </header>
  );
}
