export function FaqSection() {
  const faqs = [
  {
    question: "What is MCQZone?",
    answer:
      "MCQZone is a free platform for Odisha Government Exam preparation offering exam-wise and subject-wise MCQs with AI-powered explanations."
  },
  {
    question: "Is MCQZone completely free?",
    answer:
      "Yes. MCQZone is free to use and provides practice questions, AI explanations, and learning resources without any subscription."
  },
  {
    question: "Which exams are available on MCQZone?",
    answer:
      "MCQZone supports preparation for OPSC, OSSC, OSSSC, Odisha Police, RI, ARI, Amin, and other Odisha Government recruitment exams."
  },
  {
    question: "How do AI explanations help?",
    answer:
      "AI explanations break down each answer into simple concepts, helping you understand why an answer is correct and improve your accuracy."
  },
  {
    question: "Can I practice topic-wise and subject-wise questions?",
    answer:
      "Yes. MCQZone organizes questions by exam, subject, and topic to make your preparation structured and efficient."
  },
  {
    question: "Do I need an account to use MCQZone?",
    answer:
      "You can explore the platform without signing in, but creating a free account lets you access personalized features and save your progress."
  }
];

  return (
  <section className="section-spacing bg-white">
    <div className="container-custom max-w-4xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Frequently Asked Questions
        </h2>

        <p className="text-muted-foreground">
          Everything you need to know about preparing for Odisha Government
          Exams with MCQZone.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group border rounded-xl p-5 hover:border-primary transition-all"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-foreground">
              {faq.question}

              <span className="text-xl transition-transform group-open:rotate-45">
                +
              </span>
            </summary>

            <p className="mt-4 text-muted-foreground leading-7">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  </section>
);
}