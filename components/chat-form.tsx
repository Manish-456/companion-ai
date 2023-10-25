"use client";

import { ChatRequestOptions } from "ai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";

interface ChatFormProps {
  input: string;
  isLoading: boolean;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions
  ) => void;
}

export function ChatForm({
  isLoading,
  input,
  handleInputChange,
  onSubmit,
}: ChatFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="border-t border-primary/10 py-4 flex items-center gap-x-2"
    >
        <Input 
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder="Type a message..."
        className="rounded-lg bg-primary/10"
        />
        <Button type="submit" size={"icon"} variant={"ghost"} disabled={isLoading}>
            <SendHorizonal className="h-6 w-6" />
        </Button>
    </form>
  );
}
