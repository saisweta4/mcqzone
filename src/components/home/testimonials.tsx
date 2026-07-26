export function Testimonials() {
  const testimonials = [
    {
      name: "Ananya Mishra",
      exam: "OSSSC Aspirant",
      initials: "AM",
      review:
        "MCQZone made my preparation much more organized. The subject-wise MCQs and AI explanations helped me understand concepts instead of simply memorizing answers."
    },
    {
      name: "Rahul Sahoo",
      exam: "OPSC Aspirant",
      initials: "RS",
      review:
        "I use MCQZone every day for Odisha Government Exam preparation. The detailed explanations after every question helped improve my accuracy and confidence."
    },
    {
      name: "Sneha Patnaik",
      exam: "Odisha Police Aspirant",
      initials: "SP",
      review:
        "The exam-wise question practice is excellent. I especially liked the clean interface and AI-powered explanations that made difficult topics easy to understand."
    }
  ];

  return (
    <section className="section-spacing bg-ai-gradient">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center text-foreground mb-3">
          Trusted by Odisha Government Exam Aspirants
        </h2>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Thousands of students are preparing smarter with MCQZone through
          exam-wise practice questions, AI-powered explanations, and structured
          learning for Odisha Government Exams.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div key={idx} className="exam-card p-8">
              <div className="flex text-yellow-400 mb-4">★★★★★</div>

              <p className="text-muted-foreground italic mb-6">
                "{item.review}"
              </p>

              <div className="flex items-center gap-3 border-t pt-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {item.initials}
                </div>

                <div>
                  <h4 className="font-semibold text-sm">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {item.exam}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}