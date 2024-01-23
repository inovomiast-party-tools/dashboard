import SidebarMenu from "@/components/SidebarMenu";
import Counter from "@/components/widgets/Counter";
import List from "@/components/widgets/List";
import Music from "@/components/widgets/Music";

export default function Home() {
  return (
    <div className="flex h-screen"> {/* Ensure full height and flex layout */}
      <aside className="w-64"> {/* Fixed width for sidebar */}
        <SidebarMenu />
      </aside>
      <main className="flex-grow overflow-hidden select-none"> {/* Allow main to grow and fill space */}
        <div className="flex w-full"> {/* Flex container for the top row */}
          <div className="flex flex-col w-auto"> {/* Column container for Counter and List */}
            <div> {/* Container for Counter */}
              <Counter />
            </div>
            <div> {/* Container for List */}
              <List />
            </div>
          </div>
          <Music />
        </div>
      </main>
      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
}