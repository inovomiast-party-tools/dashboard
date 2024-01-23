import SidebarMenu from "@/components/SidebarMenu";
import Counter from "@/components/widgets/Counter";
import List from "@/components/widgets/List";

export default function Home() {
  return (
    <div className="flex">
      <aside className="h-[100%]">
        <SidebarMenu />
      </aside>
      <main className="ml-5">
        <Counter />
        <List />
      </main>
      <footer>

      </footer>
    </div>
  );
}
