import { ChatMessage } from "@/types/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Copy,
  RotateCcw,
  ThumbsDown,
} from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  if (message.role === "user") {
    return (
      <div className="flex justify-end group">
        <div className="flex items-start gap-3 max-w-[85%] md:max-w-[75%]">
          <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-sm px-5 py-3.5 text-sm shadow-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </div>

          <Avatar className="w-8 h-8 border bg-white mt-1 shrink-0 shadow-sm hidden md:flex">
            <AvatarImage src="/user-avatar.png" />
            <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs font-bold">
              U
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start group">
      <Avatar className="w-8 h-8 border bg-white mr-3 mt-1 shrink-0 shadow-sm">
        <AvatarImage src="/bot-avatar.png" />
        <AvatarFallback className="bg-indigo-600 text-white text-xs font-semibold">
          AI
        </AvatarFallback>
      </Avatar>

      <div className="w-full max-w-[85%] md:max-w-[80%] flex flex-col gap-2">
        <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-5 py-4 text-sm shadow-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
          <ReactMarkdown
  remarkPlugins={[remarkGfm, remarkMath]}
  rehypePlugins={[rehypeKatex]}
>
  {message.content}
</ReactMarkdown>
        </div>

        <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <Copy className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <ThumbsDown className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
