
interface ChatIdPageProps {
    params : {
        chatId : string
    }
}
export default function ChatIdPage({params} : ChatIdPageProps) {
  return (
    <div>
      {params.chatId}
    </div>
  )
}
