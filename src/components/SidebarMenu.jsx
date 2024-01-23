import React from "react";
import { IoMdHome, IoMdMusicalNote, IoMdPeople } from "react-icons/io";
import { IoTicket } from "react-icons/io5";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import Link from "next/link";

const SidebarMenu = () => {
  return (
    <ul className="w-56 h-[100vh] menu bg-base-200">
      <h2 className="text-xl font-bold text-center select-none"><span className="text-red-600">I</span><span className="text-green-500">N</span><span className="text-yellow-400">P</span><span className="text-purple-600">T</span>Dashboard</h2>
      <div className="mt-[-0.5px] mb-[-0.5px] divider"></div>
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
        <Link href={'/tokens'}>
          <RiMoneyEuroCircleLine size={20} /> 
          Tokens
        </Link>
      </li>
      <li>
        <Link href={'/tickets'}>
          <IoTicket size={20} /> 
          Tickets
        </Link>
      </li>
    </ul>
  );
};

export default SidebarMenu;
