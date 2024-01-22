import React from "react";
import { IoMdHome, IoMdMusicalNote, IoMdPeople } from "react-icons/io";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import Link from "next/link";

const SidebarMenu = () => {
  return (
    <ul className="w-56 h-[100vh] menu bg-base-200 rounded-box">
      <li>
        <Link href={'/'}>
          <IoMdHome size={20} />
          Inico
        </Link>
      </li>
      <li>
        <Link href={'/assistants'}>
          <IoMdPeople size={20} />
          Asistentes
        </Link>
      </li>
      <li>
        <Link href={'/music'}>
          <IoMdMusicalNote size={20} /> 
          Música
        </Link>
      </li>
      <li>
        <Link href={'/token'}>
          <RiMoneyEuroCircleLine size={20} /> 
          Tokens
        </Link>
      </li>
    </ul>
  );
};

export default SidebarMenu;
