export function WhyChooseUs() {
  const features = [
    {
      title: "Large Question Bank",
      description: "10,000+ topic-wise practice questions covering previous years.",
      icon: "📚"
    },
    {
      title: "AI Explanations",
      description: "Get personalized AI reasoning to close your knowledge gaps.",
      icon: "🤖"
    },
    {
      title: "Performance Tracking",
      description: "Detailed analytics to identify your weak areas and track progress.",
      icon: "📈"
    }
  ];

  return (
    <section className="section-spacing bg-blue-50/50">
      <div className="container-custom text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Why Odisha ExamSarthi?</h2>
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