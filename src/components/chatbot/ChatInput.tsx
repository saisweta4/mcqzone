import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Mic, Send } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({
  onSend,
  disabled = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  function handleSend() {
  const trimmed = message.trim();

  if (!trimmed) return;

  onSend(trimmed);

  setMessage("");
}
  return (
    <div className="flex flex-col gap-2">
      <div className="relative flex items-center bg-white border rounded-2xl shadow-sm focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
        <Button variant="ghost" size="icon" className="absolute left-2 text-muted-foreground hover:bg-slate-100 rounded-full">
          <Paperclip className="w-5 h-5" />
        </Button>
        
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask anything about your studies..."
          className="w-full pl-12 pr-24 py-6 border-0 focus-visible:ring-0 shadow-none bg-transparent rounded-2xl"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        
        <div className="absolute right-2 flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-slate-100 rounded-full">
            <Mic className="w-5 h-5" />
          </Button>
          <Button
          size="icon"
          disabled={disabled}
          onClick={handleSend}
          className="bg-primary hover:bg-indigo-700 rounded-xl rounded-bl-none h-10 w-10">
            <Send className="w-4 h-4 text-white" />
          </Button>
        </div>
      </div>
      <div className="text-center text-[10px] text-muted-foreground">
        AI can make mistakes. Check important info.
      </div>
    </div>
  );
}