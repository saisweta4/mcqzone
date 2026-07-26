export function WhyChooseUs() {
 const features = [
  {
    title: "Free Odisha Government Exam MCQs",
    description:
      "Practice hundreds of free exam-wise and subject-wise MCQs for OPSC, OSSC, OSSSC, Odisha Police, RI, ARI, Amin, and more.",
    icon: "📚",
  },
  {
    title: "AI-Powered Explanations",
    description:
      "Understand every answer with free AI-generated explanations designed to simplify concepts and improve your preparation.",
    icon: "🤖",
  },
  {
    title: "100% Free Learning Platform",
    description:
      "Prepare for Odisha Government Exams completely free with organized questions, detailed explanations, and a modern learning experience.",
    icon: "🎯",
  },
];

  return (
    <section className="section-spacing bg-blue-50/50">
      <div className="container-custom text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Why MCQZone?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
          We combine local exam expertise with cutting-edge technology to give you the ultimate edge.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="glass-card p-8 rounded-2xl text-left">
              <div className="text-4xl mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}