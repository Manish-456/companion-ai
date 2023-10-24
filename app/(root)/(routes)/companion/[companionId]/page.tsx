import db from "@/lib/db";
import CompanionForm from "./_components/companion-form";
import { Companion } from "@prisma/client";

interface CompanionIdProps {
  params: {
    companionId: string;
  };
}

export default async function CompanionIdPage({ params }: CompanionIdProps) {
  // TODO : Check subscription
  
  let companion: Companion | null = null;
  if (params.companionId !== "new") {
    companion = await db.companion.findUnique({
      where: {
        id: params.companionId,
      },
    });
  }

  const categories = await db.category.findMany();

  return (
    <>
      <CompanionForm initialData={companion} categories={categories} />
    </>
  );
}
