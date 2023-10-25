"use client";

import { useTheme } from 'next-themes';
import {BeatLoader} from 'react-spinners';
import { useToast } from '@/components/ui/use-toast';
import { BotAvatar } from '@/components/bot-avatar';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/user-avatar';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';


export interface ChatMessageProps {
    role : "SYSTEM" | "USER";
    content? : string;
    isLoading? : boolean;
    src? : string
}

export function ChatMessage({role, content, isLoading, src} : ChatMessageProps) {

    const {toast} = useToast();
    const {theme} = useTheme();

    const onCopy = () => {
        if(!content) return;

        navigator.clipboard.writeText(content);
        toast({
            description : "Message copied to clipboard"
        });
    }
  return (
    <div className={cn('group flex items-start gap-x-3 w-full py-4', role === "USER" && "justify-end")}>
         {role !== "USER" && src && <BotAvatar src={src} />}
         <div className='rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10'>
            {
              isLoading ? <BeatLoader
                size={5}
                color={theme === "light" ? "black" : "white"}/> : content
            }
            </div>  
            {role === "USER" && <UserAvatar />} 
            {role!=="USER" && !isLoading && (
                <Button onClick={onCopy} className='opacity-0 group-hover:opacity-100 transition' size={"icon"} variant={"ghost"}>
                    <Copy className='w-4 h-4' />
                </Button>
            )}  
   
    </div>
  )
}
