import db from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { Categories } from "@/components/categories";

export default async function Home() {
  const categories = await db.category.findMany();

    return (
     <div className="p-4 space-y-2 h-full">
      <SearchInput />
      <Categories data={categories} />
     </div>
    )
  }
  