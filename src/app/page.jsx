import SidebarMenu from "@/components/SidebarMenu";
import Image from "next/image";
import { IoMdHome } from "react-icons/io";
import QRCode from "react-qr-code";

export default function Home() {
  return (
    <div className="flex">
      <aside className="h-[100%]">
        <SidebarMenu />
      </aside>
      <main className="ml-5">
        <div className="pl-2 mt-5 bg-gray-800 rounded-lg w-80">
          <h2 className="font-bold">ASISTENTES:</h2>
          <div className="grid grid-cols-2 row-span-2">
            <div>
              <p>Invitados:</p>
              <span>0</span>
            </div>
            <div>
              <p>Asistentes:</p>
              <span>0</span>
            </div>
          </div>
        </div>
      </main>
      <footer>

      </footer>
    </div>
  );
}
