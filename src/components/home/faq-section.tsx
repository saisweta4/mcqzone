export function FaqSection() {
  const faqs = [
    "Is the content updated for 2024-25 exams?",
    "How does the AI Explanation feature help me?",
    "Are the mock tests available in Odia language?"
  ];

  return (
    <section className="section-spacing bg-white">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Common Questions</h2>
          <p className="text-muted-foreground">
            Can't find what you're looking for? Reach out to our support team.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border rounded-lg p-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors">
              <span className="font-medium text-foreground">{faq}</span>
              <span className="text-gray-400 text-xl">+</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}