import db from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { Categories } from "@/components/categories";
import { Companions } from "@/components/companions";

interface HomePageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

export default async function Home({ searchParams }: HomePageProps) {
  const data = await db.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
       contains : searchParams.name
       },
    },
    orderBy: { createdAt: "desc" },
    include : {
      _count : {
        select : {
          messages : true
        }
      }
    }

  });
  const categories = await db.category.findMany();

  return (
    <div className="p-4 space-y-2 h-full">
      <SearchInput />
      <Categories data={categories} />
      <Companions data={data} />
    </div>
  );
}
