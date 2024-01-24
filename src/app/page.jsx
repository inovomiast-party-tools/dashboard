import React from 'react';
import { SidebarMenu, List, Counter, Music, Transactions } from '@/components/widgets'

export default function Home() {
  return (
    <div className="flex h-screen">
      <aside className="w-64">
        <SidebarMenu />
      </aside>
      <main className="flex-grow overflow-hidden select-none">
        <div className="flex w-full">
          <div className="flex flex-col w-auto">
            <div>
              <Counter />
            </div>
            <div>
              <List />
            </div>
          </div>
          <div className="flex flex-col flex-grow">
            <Music />
            <Transactions />
          </div>
        </div>
      </main>
      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
}