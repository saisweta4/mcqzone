import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, Settings, LogOut } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Sidebar() {
  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center gap-2 mb-6 text-primary font-bold text-xl">
        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          <div className="w-3 h-3 bg-white mask mask-heart" />
        </div>
        MCQZone
      </div>

      <Button className="w-full justify-start gap-2 bg-primary hover:bg-indigo-700 text-white mb-6">
        <Plus className="w-4 h-4" /> New Chat
      </Button>

      <div className="text-xs font-semibold text-muted-foreground mb-3 px-2">
        RECENT HISTORY
      </div>
      
      <ScrollArea className="flex-1 -mx-2 px-2">
        <div className="space-y-1">
          {["Biology MCQ Review", "Javascript Functions", "History Essay Help"].map((item) => (
            <Button key={item} variant="ghost" className="w-full justify-start font-normal text-sm gap-2">
              <MessageSquare className="w-4 h-4 text-muted-foreground" />
              {item}
            </Button>
          ))}
        </div>
      </ScrollArea>

      <div className="pt-4 border-t mt-auto space-y-1">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Settings className="w-4 h-4" /> Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50">
          <LogOut className="w-4 h-4" /> Sign Out
        </Button>
      </div>
    </div>
  );
}