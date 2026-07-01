import { gemini } from "@/lib/gemini";
import { CHATBOT_SYSTEM_PROMPT } from "@/prompts/chatbot";

export async function chatWithAI(message: string) {
  const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${CHATBOT_SYSTEM_PROMPT}

User Question:
${message}`,
  });

  return response.text;
}
