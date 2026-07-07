export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Choose Your Exam",
      desc: "Select from OPSC, OSSC, OSSSC, or specialized departmental exams."
    },
    {
      step: "02",
      title: "Practice Questions",
      desc: "Go through topic-wise questions at your own pace with detailed solutions."
    },
    {
      step: "03",
      title: "Take Mock Quizzes",
      desc: "Simulate the actual exam environment with timed, full-length mock tests."
    },
    {
      step: "04",
      title: "Improve with AI",
      desc: "Review incorrect answers with personalized AI tutoring and close your gaps."
    }
  ];

  return (
    <section className="section-spacing bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-muted-foreground">Exam Focused Learning</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, idx) => (
            <div key={idx} className="relative p-6 border rounded-2xl hover:border-primary/50 shadow-sm transition-all">
              <div className="text-5xl font-extrabold text-blue-50/50 absolute top-4 right-4 z-0">
                {item.step}
              </div>
              <div className="relative z-10 pt-4">
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-primary-200 text-shadow-2xl">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="primary-button-gradient rounded-full px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
            Start Your Free Journey
          </button>
        </div>
      </div>
    </section>
  );
}