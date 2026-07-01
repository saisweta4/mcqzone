"use client";

import { useState } from "react";
import { ChatMessage } from "@/types/chat";
import { Sidebar } from "@/components/chatbot/Sidebar";
import { ChatFeed } from "@/components/chatbot/ChatFeed"
import { ChatInput } from "@/components/chatbot/ChatInput";
import { sendChatMessage } from "@/services/ai/chatApi";

export default function MCQZoneChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
const [isLoading, setIsLoading] = useState(false);
async function sendMessage(content: string) {
  const userMessage: ChatMessage = {
    id: crypto.randomUUID(),
    role: "user",
    content,
    createdAt: new Date(),
  };

  // Show user's message immediately
  setMessages((prev) => [...prev, userMessage]);

  setIsLoading(true);

  try {
    const reply = await sendChatMessage(content);

    const aiMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: reply,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
  } catch (error) {
    const errorMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Sorry, something went wrong while generating the response.",
      createdAt: new Date(),
      isError: true,
    };

    setMessages((prev) => [...prev, errorMessage]);
  } finally {
    setIsLoading(false);
  }
}
  return (
    <div className="flex h-screen w-full bg-slate-50/50">
      {/* Left Sidebar - Hidden on Mobile */}
      <div className="hidden md:flex w-64 flex-col border-r bg-background">
        <Sidebar />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Scrollable Feed */}
        <main className="flex-1 overflow-hidden relative">
          <ChatFeed
  messages={messages}
  isLoading={isLoading}
/>
        </main>

        {/* Sticky Input Area */}
        <div className="p-4 bg-background/80 backdrop-blur-sm border-t">
          <div className="max-w-3xl mx-auto">
            <ChatInput
  onSend={sendMessage}
  disabled={isLoading}
/>
          </div>
        </div>
      </div>

      {/* Optional Right Sidebar (Study Tips/Widgets) - Hidden on smaller screens */}
      {/* <div className="hidden lg:flex w-72 flex-col border-l bg-background p-4">
         <WidgetsPanel />
      </div> */}
    </div>
  );
}