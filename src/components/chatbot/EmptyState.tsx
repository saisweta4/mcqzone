import { Card } from "@/components/ui/card";
import { Sparkles, BookOpen, PenTool, Layout, Target } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto px-4">
      <div className="w-16 h-16 bg-white border shadow-sm rounded-2xl flex items-center justify-center mb-6 relative">
        <Sparkles className="w-8 h-8 text-primary" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
      </div>
      
      <h2 className="text-2xl font-bold mb-2 text-slate-800">How can I help you today?</h2>
      <p className="text-muted-foreground text-center mb-8 max-w-md">
        Your intelligent companion for solving complex problems and structuring data. Start a new conversation or pick a shortcut below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <Card className="p-4 cursor-pointer hover:border-indigo-200 transition-colors">
          <BookOpen className="w-5 h-5 text-indigo-500 mb-2" />
          <h3 className="font-semibold text-sm mb-1">Summarize Notes</h3>
          <p className="text-xs text-muted-foreground">Upload or paste your notes for a quick summary.</p>
        </Card>
        {/* Replicate the card structure for the other 3 empty state options */}
      </div>
    </div>
  );
}