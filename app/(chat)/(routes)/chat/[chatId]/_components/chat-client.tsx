"use client";

import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import {useCompletion} from "ai/react";
import { Companion, Message } from '@prisma/client'
import { ChatHeader } from '@/components/chat-header';
import { ChatForm } from '@/components/chat-form';
import { ChatMessages } from '@/components/chat-messages';
import { ChatMessageProps } from '@/components/chat-message';

interface ChatClientProps {
    companion : (Companion & {
     messages : Message[];
     _count : {
        messages : number
     }
    })
}
export function ChatClient({companion} : ChatClientProps) {
    const router = useRouter();
    const [messages, setMessages] = useState<ChatMessageProps[]>(companion.messages);

    const {
        input,
        isLoading,
        handleInputChange,
        setInput,
        handleSubmit
    } = useCompletion({
        api : `/api/chat/${companion.id}`,
        onFinish : (_, completion) => {
            const systemMessage : ChatMessageProps = {
                role : "SYSTEM",
                content : completion
            };
            setMessages(current => [...current, systemMessage]);
            setInput("");

            router.refresh();
        }
    });

    const onSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userMessage : ChatMessageProps = {
            role : "USER",
            content : input
        };

        setMessages((current) => [...current, userMessage]);

        handleSubmit(e);
    }

  return (
    <div className='flex flex-col h-screen p-4 space-y-2'>
      <ChatHeader companion={companion} />
        <ChatMessages
        messages={messages}
        companion={companion} isLoading={isLoading} />
         <ChatForm
          isLoading={isLoading}
          input={input}
          handleInputChange={handleInputChange}
          onSubmit={onSubmit}
         />
    </div>
  )
}
