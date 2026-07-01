export async function sendChatMessage(message: string) {
  const response = await fetch("/api/ai/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate AI response.");
  }

  const data = await response.json();

  return data.reply as string;
}