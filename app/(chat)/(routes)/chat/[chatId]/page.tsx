import db from "@/lib/db";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ChatClient } from "./_components/chat-client";

interface ChatIdPageProps {
  params: {
    chatId: string;
  };
}
export default async function ChatIdPage({ params }: ChatIdPageProps) {
  const { userId } = auth();
  const { chatId } = params;

  if (!userId) return redirectToSignIn();

  const companion = await db.companion.findUnique({
    where: {
      id: chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if(!companion) return redirect("/");

  return <div>
    <ChatClient companion={companion}/>
  </div>;
}
