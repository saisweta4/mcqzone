"use client"
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export function HowItWorks() {
  const router = useRouter();
const { isSignedIn } = useUser();
const steps = [
  {
    step: "01",
    title: "Choose Your Government Exam",
    desc: "Select your target exam like OPSC, OSSC, OSSSC, Odisha Police, RI, ARI, Amin, and other Odisha government recruitment exams."
  },
  {
    step: "02",
    title: "Practice Exam-Wise Questions",
    desc: "Solve carefully curated MCQs with detailed explanations to strengthen your concepts and improve accuracy."
  },
  {
    step: "03",
    title: "Track Your Learning Progress",
    desc: "Organize your preparation by exploring subjects, topics, and questions while building confidence for competitive exams."
  },
  {
    step: "04",
    title: "Learn with AI Explanations",
    desc: "Understand every answer using AI-powered explanations that simplify difficult concepts and help you avoid repeating mistakes."
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
          <button
  onClick={() =>
    router.push(isSignedIn ? "/exams" : "/sign-in")
  }
  className="primary-button-gradient rounded-full px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
>
  Start Your Free Journey
</button>
        </div>
      </div>
    </section>
  );
}