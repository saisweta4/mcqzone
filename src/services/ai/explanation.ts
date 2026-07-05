import { gemini } from "@/lib/ai/gemini";
import { EXPLANATION_SYSTEM_PROMPT } from "@/prompts/explanation";

type ExplanationInput = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export async function generateExplanation(input: ExplanationInput) {
  const { question, options, correctAnswer } = input;

  const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${EXPLANATION_SYSTEM_PROMPT}

Question:
${question}

Options:
${options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join("\n")}

Correct Answer:
${correctAnswer}
`,
  });

  const text = response.text?.trim() ?? "";

return JSON.parse(text);
}