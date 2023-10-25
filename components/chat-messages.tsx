"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
import { Companion, Message } from "@prisma/client";
import { ChatMessage, ChatMessageProps } from "@/components/chat-message";

interface ChatMessagesProps {
  messages: ChatMessageProps[];
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };

  isLoading: boolean;
}
export function ChatMessages({
  messages = [],
  companion,
  isLoading,
}: ChatMessagesProps) {
  const scrollRef = useRef<ElementRef<"div">>(null);
  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );

  useEffect(() => {
    const timeOut = setTimeout(() => setFakeLoading(false), 1000);

    return () => clearTimeout(timeOut);
  }, []);

  useEffect(() => {
   scrollRef.current?.scrollIntoView({behavior : "smooth"});
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto">
      <ChatMessage
        src={companion.src}
        role="SYSTEM"
        isLoading={fakeLoading}
        content={`Hello, I am ${companion.name}, ${companion.description}`}
      />
      {messages.map((message) => (
        <ChatMessage
          role={message.role}
          key={message.content}
          content={message.content}
          src={message.src}
        />
      ))}
      {isLoading && <ChatMessage role="SYSTEM" src={companion.src} isLoading />}
      <div ref={scrollRef} />
    </div>
  );
}
