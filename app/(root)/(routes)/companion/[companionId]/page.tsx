import db from "@/lib/db";
import CompanionForm from "./_components/companion-form";
import { Companion } from "@prisma/client";
import { auth, redirectToSignIn } from "@clerk/nextjs";

interface CompanionIdProps {
  params: {
    companionId: string;
  };
}

export default async function CompanionIdPage({ params }: CompanionIdProps) {
  const {userId} = auth();
  // TODO : Check subscription
  
  if(!userId) return redirectToSignIn();

  let companion: Companion | null = null;

  if (params.companionId !== "new") {
    companion = await db.companion.findUnique({
      where: {
        id: params.companionId,
        userId : userId as string
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
