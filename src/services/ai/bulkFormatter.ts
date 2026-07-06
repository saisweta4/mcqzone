import { gemini } from "@/lib/ai/gemini";
import { bulkFormatterPrompt } from "@/prompts/bulkFormatter";

export async function formatQuestionsWithAI(input: string) {
  const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${bulkFormatterPrompt}

${input}
`,
  });

  const text = response.text?.trim() ?? "";

  return JSON.parse(text);
}