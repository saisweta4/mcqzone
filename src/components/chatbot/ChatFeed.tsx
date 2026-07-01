import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AlertCircle, Copy, RotateCcw, ThumbsDown } from "lucide-react";
import { EmptyState } from "./EmptyState"; // Assuming you created this from the previous snippet
import { ChatMessage } from "@/types/chat";
import { MessageBubble } from "./MessageBubble";

interface ChatFeedProps {
  messages: ChatMessage[];
  isLoading?: boolean;
}

// Mock data array illustrating the different message states

export function ChatFeed({
  messages,
  isLoading = false,
}: ChatFeedProps) {
  // Render Empty State if no messages exist
  if (messages.length === 0 && !isLoading) {
    return (
      <div className="h-full overflow-y-auto p-4 flex items-center justify-center">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6 pb-32 scroll-smooth">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Date divider */}
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="h-px bg-slate-200 flex-1 max-w-[80px]"></div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Today</span>
          <div className="h-px bg-slate-200 flex-1 max-w-[80px]"></div>
        </div>

{messages.map((message) => (
  <MessageBubble
    key={message.id}
    message={message}
  />
))}
{isLoading && (
  <div className="flex justify-start">
    <div className="bg-white border rounded-2xl rounded-tl-sm px-5 py-4 text-sm text-slate-500 shadow-sm animate-pulse">
      MCQZone AI is thinking...
    </div>
  </div>
)}
      </div>
    </div>
  );
}